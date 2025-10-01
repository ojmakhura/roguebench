import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '@env/environment';
import { MaterialModule } from './material.module';
import { I18nService } from './i18n/i18n.service';
import { AppEnvStore } from './store/app-env.state';

import Keycloak from 'keycloak-js';
import { AuthorisationApi } from './service/bw/co/roguesystems/bench/authorisation/authorisation-api';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from './utils/select-item';
import { ApplicationApi } from './service/bw/co/roguesystems/bench/application/application-api';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from 'keycloak-angular';
import { Logger } from './@shared';
import { ApplicationApiStore } from './store/bw/co/roguesystems/bench/application/application-api.store';
import { ApplicationDTO } from './model/bw/co/roguesystems/bench/application/application-dto';
import { AuthorisationListDTO } from './model/bw/co/roguesystems/bench/authorisation/authorisation-list-dto';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, MaterialModule],
})
export class AppComponent implements OnInit, OnDestroy {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  private titleService = inject(Title);
  private translateService = inject(TranslateService);
  private i18nService = inject(I18nService);
  readonly appStore = inject(AppEnvStore);
  protected keycloak = inject(Keycloak);
  private authorisationApi = inject(AuthorisationApi);
  protected applicationApi = inject(ApplicationApi);
  protected applicationStore = inject(ApplicationApiStore);
  http = inject(HttpClient);
  env = this.appStore.env;

  application: ApplicationDTO | undefined;
  e: any;

  envLoaded = false;
  applicationLoaded = false;

  loadingEnv = false;
  loadMenus = false;

  constructor() {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(() => {
      const keycloakEvent = keycloakSignal();

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        console.log('Keycloak ready', keycloakEvent.args);
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.appStore.reset();
      }
    });

    effect(() => {
      if (!this.env) {
        return;
      }

      this.e = this.env();
      if (this.e) {
        if (this.e && this.loadingEnv) {
          // this.loadRealmRoles(e);
          this.loadingEnv = false;
          this.envLoaded = true;

          if(this.applicationLoaded) {
            this.loadRealmRoles();
            this.envLoaded = false;
            this.applicationLoaded = false;
          }
        }
      }
    });

    effect(() => {

      this.application = this.applicationStore.data();
      if (this.application?.id) {
        this.appStore.setApplication(this.application);
        this.applicationLoaded = true;

        if (this.e && this.loadMenus) {
          this.loadRealmRoles();
          this.loadAuthorisedPaths();
          this.applicationLoaded = false;
          this.envLoaded = false;
          this.loadMenus = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.appStore.setAuthorisedPathsLoaded(false);
    this.loadingEnv = true;

    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
      )
      .subscribe((event) => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });

    this.appStore.getEnv();
    this.loadMenus = true;
    this.applicationStore.findByCode({ code: environment.applicationCode });

    if (!this.keycloak.authenticated) {
      this.appStore.setAuthorisedPathsLoaded(true);
    }
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }

  loadRealmRoles() {
    if (this.keycloak.authenticated) {

      this.keycloak.loadUserInfo().then((userInfo) => {
        this.appStore.setUsername((userInfo || {} as any)['preferred_username']);
      });

      let realmUrl = `${this.e.authDomain}/admin/realms/${this.keycloak.realm}`;

      let excludedRoles = ['offline_access', 'uma_authorization', `default-roles-${this.keycloak.realm}`];
      let realRoles = (this.keycloak.realmAccess?.roles || []).filter((role) => {
        return excludedRoles.indexOf(role) === -1;
      });

      realRoles
        .forEach((role) => {
          this.http.get<any>(`${realmUrl}/roles/${role}`).subscribe((role) => {
            if (this.keycloak.realmAccess?.roles.includes(role.name)) {
              let item = new SelectItem();
              item.label = role['description'];
              item.value = role['name'];

              this.appStore.addRealmRole(item);
            }
          });
        });

      // this.loadAuthorisedPaths(realRoles);

    }
  }

  loadAuthorisedPaths() {
    let excludedRoles = ['offline_access', 'uma_authorization', `default-roles-${this.keycloak.realm}`];
    let realmRoles = (this.keycloak.realmAccess?.roles || []).filter((role) => {
      return excludedRoles.indexOf(role) === -1;
    });

    let loggedIn = this.keycloak.authenticated;

    if (loggedIn && realmRoles.length > 0) {
      this.appStore.setAuthorisedPathsLoaded(false);
      this.appStore.setLoadingMenus(true);
      let menus = new Array<string>();
      menus.push('MENU');
      menus.push('VIEW');

      this.authorisationApi
        .getAccessTypeCodeAuthorisations(this.application?.id,
          realmRoles,
          menus,
        )
        .subscribe({
          next: (authorisations: AuthorisationListDTO[]) => {
            this.appStore.addMenus(
              authorisations
              .filter((auth) => auth.accessPointType === 'Menu')
              .map((auth) => {

                return {
                  routerLink: auth.accessPointUrl,
                  titleKey: auth.accessPoint,
                  icon: auth.accessPointIcon,
                  roles: auth.roles as string[],
                };
              }),
            );

            this.appStore.setLoadingMenus(false);
            this.appStore.setAuthorisedPaths(authorisations.map((auth) => auth.accessPointUrl as string));
            this.appStore.setAuthorisedPathsLoaded(true);
          },
          error: (error) => {
            this.appStore.setAuthorisedPathsLoaded(true);
          },
          complete: () => { },
        });
    }
  }
}
