// Generated by andromda-angular cartridge (view\view.component.imp.ts.vsl) CAN EDIT!
import { Component, effect, inject, signal } from '@angular/core';
import { SearchAuthorisationsComponent } from '@app/view/authorisation/search-authorisations.component';
import { SearchAuthorisationsVarsForm } from '@app/view/authorisation/search-authorisations.component';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { TableComponent } from '@app/components/table/table.component';
import { LoaderComponent } from "@app/@shared/loader/loader.component";
import { AuthorisationSearchImplComponent } from '@app/components/authorisation/authorisation-search-impl.component';
import Keycloak from 'keycloak-js';
import { AppEnvStore } from '@app/store/app-env.state';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { UrlTree } from '@angular/router';
import { AuthorisationCriteria } from '@app/model/bw/co/roguesystems/bench/authorisation/authorisation-criteria';
import { SearchObject } from '@app/model/search-object';
import { environment } from '@env/environment';

export enum SearchAuthorisationsRestrictions {
  DELETE_BUTTON = '/authorisation/search{button:delete}',
}

@Component({
  selector: 'app-search-authorisations',
  templateUrl: './search-authorisations.component.html',
  styleUrls: ['./search-authorisations.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    TableComponent,
    LoaderComponent,
    AuthorisationSearchImplComponent,
  ],
})
export class SearchAuthorisationsImplComponent extends SearchAuthorisationsComponent {
  protected keycloak: Keycloak = inject(Keycloak);
  http = inject(HttpClient);
  readonly appStore = inject(AppEnvStore);
  realmRoles = this.appStore.realmRoles;

  constructor() {
    super();
    this.authorisationApiStore.reset();
    this.success = this.authorisationApiStore.success;
    this.loading = this.authorisationApiStore.loading;
    this.error = this.authorisationApiStore.error;
    this.messages = this.authorisationApiStore.messages;
    this.loaderMessage = this.authorisationApiStore.loaderMessage;
    this.authorisationsTablePaged = true;
    this.authorisationsTableSignal = this.authorisationApiStore.dataPage;

    effect(() => {
      let restrictedItems = this.authorisationApiStore.dataList();

      if (restrictedItems) {
        restrictedItems.forEach((item) => {
          if (item.url === SearchAuthorisationsRestrictions.DELETE_BUTTON) {
            this.deleteUnrestricted = true;
          }
        });
      }
    });
  }

  override beforeOnInit(form: SearchAuthorisationsVarsForm): SearchAuthorisationsVarsForm {
    return form;
  }

  doNgOnDestroy(): void {}

  override doNgAfterViewInit(): void {
    this.authorisationsTable?.tablePaginator?.page?.subscribe({
      next: (paginator: MatPaginator) => {
        this.doSearch(paginator.pageIndex, paginator.pageSize);
      },
    });
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    let cleanUrl = tree.root.children['primary']?.segments.map((it) => it.path).join('/') || '';

    this.authorisationApiStore.findRestrictedViewItems({
      applicationId: environment.applicationCode,
      url: encodeURIComponent(`/${cleanUrl}{`),
      roles: this.appStore.realmRoles().map((role) => role.value),
    });

    this.doSearch();

    this.authorisationApiStore.findMyAuthorisedApplications({
      application: ''
    });
  }

  override beforeSearchAuthorisationsSearch(form: any): void {
    form.criteria = this.criteria.formGroupControl.value;
    this.doSearch();
  }

  private doSearch(pageNumber: number = 0, pageSize: number = 10): void {
    let criteria = new SearchObject<AuthorisationCriteria>();
    criteria.criteria = this.criteria.formGroupControl.value;

    let tmp: Set<string> = criteria.criteria.roles;
    let roles: Array<string> = [];

    tmp.forEach((role) => {
      roles.push(role);
    });

    criteria.criteria.roles = roles;
    criteria.criteria.applicationId = this.appStore.application()?.id;

    criteria.pageNumber = pageNumber;
    criteria.pageSize = pageSize;

    this.authorisationApiStore.searchPaged({ criteria: criteria });
  }

  override afterOnInit(): void {}
}
