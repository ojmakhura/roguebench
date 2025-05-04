import { Directive, inject, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AppEnvStore } from '@app/store/app-env.state';

@Directive({
  selector: '[hasRealmRole]',
  standalone: true
})
export class HasRealmRoleDirective {

  appStore = inject(AppEnvStore);
  private templateRef = inject(TemplateRef<any>)
  private viewContainer = inject(ViewContainerRef)

  constructor() { }

  @Input()
  set hasRealmRole(roles: string[]) {

    let hasRole = this.appStore.realmRoles().some(role => roles.includes(role.value));

    Promise.all([hasRole]).then(results => {
      this.logic(results);
    });

  }

  private logic(validities: Array<boolean>) {
    let hasRole: boolean;

    if (validities.length === 0) hasRole = false;
    else if (validities.length === 1) hasRole = validities[0];
    else {
      hasRole = validities.reduce((total, curr) => total || curr);
    }

    if (hasRole === true) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
