import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import Keycloak from 'keycloak-js';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import * as nav from './navigation';
import { LanguageSelectorComponent } from '@app/i18n/language-selector.component';
import { MatDrawer } from '@angular/material/sidenav';
import { AppEnvStore } from '@app/store/app-env.state';
import { HasRolesDirective } from 'keycloak-angular';
import { HasRealmRoleDirective } from '@app/directive/has-realm-role.directive';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, MaterialModule, RouterModule, LanguageSelectorComponent, HasRealmRoleDirective],
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatDrawer | undefined;
  readonly appStore = inject(AppEnvStore);
  private titleService = inject(Title);
  protected keycloak = inject(Keycloak);
  private breakpoint = inject(BreakpointObserver);
  env = this.appStore.env;
  protected router: Router = inject(Router);

  menus: any[] = [];
  isMobileMenuOpen = false;

  constructor() {
    effect(() => {
      console.log('env', this.appStore.env());
    });

    effect(() => {
      console.log(this.appStore.menus());
    });
  }

  ngOnInit() {
    this.menus = nav.menuItems;
    console.log(this.appStore.menus())
    console.log(this.keycloak.profile)
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    let e = this.env ? this.env() : null;
    this.keycloak.logout({
      redirectUri: window.location.origin
    }).then(() => {});
  }

  get isMobile(): boolean {
    return this.breakpoint.isMatched(Breakpoints.Small) || this.breakpoint.isMatched(Breakpoints.XSmall);
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  async login() {
    try {
      await this.keycloak.login();
    } catch (err) {
      console.error('Login failed', err);
    }
  }
}
