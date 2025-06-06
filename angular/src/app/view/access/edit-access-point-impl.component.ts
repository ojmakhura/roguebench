// Generated by andromda-angular cartridge (view\view.component.imp.ts.vsl) CAN EDIT!
import { Component, effect, inject, signal } from '@angular/core';
import { EditAccessPointComponent } from '@app/view/access/edit-access-point.component';
import { EditAccessPointVarsForm } from '@app/view/access/edit-access-point.component';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { TableComponent } from '@app/components/table/table.component';
import { LoaderComponent } from '@app/@shared/loader/loader.component';
import { AccessPointSearchImplComponent } from '@app/components/access/access-point-search-impl.component';
import { AppEnvStore } from '@app/store/app-env.state';
import { AuthorisationApiStore } from '@app/store/bw/co/roguesystems/bench/authorisation/authorisation-api.store';
import { UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '@env/environment';
import { AccessPointTypeApiStore } from '@app/store/bw/co/roguesystems/bench/access/type/access-point-type-api.store';
import { ApplicationApiStore } from '@app/store/bw/co/roguesystems/bench/application/application-api.store';
import { AccessPointTypeDTO } from '@app/model/bw/co/roguesystems/bench/access/type/access-point-type-dto';

export enum EditAccessPointRestrictions {
  DELETE_BUTTON = '/access/edit{button:delete}',
}

@Component({
  selector: 'app-edit-access-point',
  templateUrl: './edit-access-point.component.html',
  styleUrls: ['./edit-access-point.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    LoaderComponent,
  ],
})
export class EditAccessPointImplComponent extends EditAccessPointComponent {
  deleting = false;

  private appState = inject(AppEnvStore);
  private authorisationApiStore = inject(AuthorisationApiStore);
  readonly accessPointTypeApiStore = inject(AccessPointTypeApiStore);
  readonly applicationApiStore = inject(ApplicationApiStore);

  constructor() {
    super();
    this.accessPointApiStore.reset();
    this.success = this.accessPointApiStore.success;
    this.loading = this.accessPointApiStore.loading;
    this.error = this.accessPointApiStore.error;
    this.messages = this.accessPointApiStore.messages;
    this.loaderMessage = this.accessPointApiStore.loaderMessage;

    effect(() => {
      let restrictedItems = this.authorisationApiStore.dataList();

      if (restrictedItems) {
        restrictedItems.forEach((item) => {
          if (item === EditAccessPointRestrictions.DELETE_BUTTON) {
            this.deleteUnrestricted = true;
          }
        });
      }

      if (this.success() && this.deleting) {
        this.deleting = false;
        this.router.navigate(['/access']);
      }
    });

    effect(() => {
      let accessPoint = this.accessPointApiStore.data();
      if (accessPoint) {
        this.editAccessPointForm.patchValue(accessPoint);
        // this.editAccessPointForm.get('accessPointType')?.setValue(accessPoint.accessPointType);
        // this.editAccessPointForm.get('accessPointType')?.updateValueAndValidity();
        if (accessPoint?.accessPointType.id) {
          this.accessPointTypeFilteredList$ = of([accessPoint?.accessPointType]);
        }

        if(accessPoint?.application) {
          this.applicationFilteredList$ = of([accessPoint?.application]);

        }
      }
    });

    effect(() => {
      this.accessPointTypeBackingList = this.accessPointTypeApiStore.dataList();
        this.accessPointTypeFilteredList$ = of(this.accessPointTypeBackingList);
    });

    effect(() => {
      this.applicationBackingList = this.applicationApiStore.dataList();
      this.applicationFilteredList$ = of(this.applicationBackingList);
    });
  }

  override beforeOnInit(form: EditAccessPointVarsForm): EditAccessPointVarsForm {
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.accessPointApiStore.findById(params);
      }
    });

    const tree: UrlTree = this.router.parseUrl(this.router.url);
    let cleanUrl = tree.root.children['primary']?.segments.map((it) => it.path).join('/') || '';

    this.authorisationApiStore.findRestrictedViewItems({
      applicationId: environment.applicationCode,
      url: encodeURIComponent(`/${cleanUrl}{`),
      roles: this.appState.realmRoles().map((role) => role.value),
    });

    return form;
  }

  doNgOnDestroy(): void { }

  override beforeEditAccessPointSave(form: any): void {
    if (this.editAccessPointForm.invalid) {
      return;
    }

    let accessPoint = this.editAccessPointForm.value;
    this.accessPointApiStore.save({ accessPoint });
  }

  override beforeEditAccessPointDelete(): void {
    if (confirm('Are you sure you want to delete this access point? This action cannot be undone.')) {
      this.deleting = true;
      let accessPoint = this.editAccessPointForm.value;
      this.accessPointApiStore.remove({ id: accessPoint.id });
    }
  }

  override doNgAfterViewInit(): void {
    this.editAccessPointForm = this.editAccessPointForm;
  }

  override editAccessPointFormReset() {
    super.editAccessPointFormReset();
    this.accessPointTypeFilteredList$ = of([]);
  }

  override filterAccessPointType(): void {
    this.accessPointTypeApiStore.search({ criteria: this.accessPointTypeFilterCtrl.value ? this.accessPointTypeFilterCtrl.value : '' });
  }

  override accessPointTypeCompare(o1: AccessPointTypeDTO | any, o2: AccessPointTypeDTO | any) {
    return o1 && o2 ? o1.id === o2.id : false;
  }

  override filterApplication(): void {
    this.applicationApiStore.search({ criteria: this.applicationFilterCtrl.value ? this.applicationFilterCtrl.value : '' });
  }

  override applicationCompare(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : false;
  }
}
