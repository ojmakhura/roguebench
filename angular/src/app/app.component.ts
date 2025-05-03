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
import { AuthorisationApiStore } from './store/bw/co/roguesystems/bench/authorisation/authorisation-api.store';
import { AuthorisationApi } from './service/bw/co/roguesystems/bench/authorisation/authorisation-api';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from './utils/select-item';
import * as nav from './shell/navigation';
import { ApplicationApi } from './service/bw/co/roguesystems/bench/application/application-api';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs } from 'keycloak-angular';
import { Logger } from './@shared';

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
  private authorisationStore = inject(AuthorisationApiStore);
  private authorisationApi = inject(AuthorisationApi);
  protected applicationApi = inject(ApplicationApi);
  http = inject(HttpClient);
  env = this.appStore.env;

  loadingEnv = false;

  constructor() {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(() => {
      if (!this.env) {
        return;
      }

      let e = this.env();
      if (e) {
        if (e && this.loadingEnv) {
          this.loadRealmRoles(e);
          this.loadingEnv = false;
        }
      }

      let realmRoles = this.appStore.realmRoles();
    });

    effect(() => {
      const keycloakEvent = keycloakSignal();

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        console.log('Keycloak ready', keycloakEvent.args);
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.appStore.reset();
      }
    });
  }

  ngOnInit() {
    console.log('ngOnInit', environment);
    this.applicationApi.findByCode(environment.applicationCode).subscribe({
      next: (application) => {
        this.appStore.setApplication(application);
      },
      error: (error) => {
      },
      complete: () => {
      },
    });
    this.appStore.setAuthorisedPathsLoaded(false);
    this.loadingEnv = true;
    this.appStore.getEnv();

    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }
    console.log(this.appStore.application())

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

    if (!this.keycloak.authenticated) {
      this.appStore.setAuthorisedPathsLoaded(true);
    }
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }

  loadRealmRoles(env: any) {
    if (this.keycloak.authenticated) {

      this.keycloak.loadUserInfo().then((userInfo) => {
        this.appStore.setUsername((userInfo || {} as any)['preferred_username']);
      });

      let realmUrl = `${env.authDomain}/admin/realms/${this.keycloak.realm}`;
      let excludedRoles = ['offline_access', 'uma_authorization', `default-roles-${this.keycloak.realm}`];

      let realRoles = (this.keycloak.realmAccess?.roles || []).filter((role) => {
        return excludedRoles.indexOf(role) === -1;
      });

      realRoles
        .forEach((role) => {
          console.log('test role', role);
          this.http.get<any>(`${realmUrl}/roles/${role}`).subscribe((role) => {
            if (this.keycloak.realmAccess?.roles.includes(role.name)) {
              let item = new SelectItem();
              item.label = role['description'];
              item.value = role['name'];

              this.appStore.addRealmRole(item);
              console.log(this.appStore.realmRoles());
            }
          });
        });

      this.loadAuthorisedPaths(realRoles);

    }
  }

  loadAuthorisedPaths(realmRoles: string[] = []) {
    let loggedIn = this.keycloak.authenticated;

    if (loggedIn && realmRoles.length > 0) {
      this.appStore.setAuthorisedPathsLoaded(false);
      this.appStore.setLoadingMenus(true);
      let menus = new Array<string>();
      menus.push('MENU');
      menus.push('VIEW');

      this.authorisationApi
        .getAccessTypeCodeAuthorisations(environment.applicationCode,
          realmRoles,
          menus,
        )
        .subscribe({
          next: (authorisations) => {
            this.appStore.addMenus(
              nav.menuItems.map((menu) => {
                let m = authorisations.find((auth) => auth.accessPointUrl === menu.routerLink);
                if (m) {
                  return menu;
                }
              }),
            );

            this.appStore.setLoadingMenus(false);
            this.appStore.setAuthorisedPaths(authorisations.map((auth) => auth.accessPointUrl));
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
