// Generated by andromda-angular cartridge (view\view.component.imp.ts.vsl) CAN EDIT!
import { Component } from '@angular/core';
import { EditUserComponent } from '@app/view/user/edit-user.component';
import { EditUserVarsForm } from '@app/view/user/edit-user.component';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { TableComponent } from '@app/components/table/table.component';
import { LoaderComponent } from "@app/@shared/loader/loader.component";
import { ChangePasswordImplComponent } from '@app/view/user/change-password-impl.component';
import { UserEditorImplComponent } from '@app/components/user/user-editor-impl.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    TableComponent,
    LoaderComponent,
    ChangePasswordImplComponent,
    UserEditorImplComponent,
  ],
})
export class EditUserImplComponent extends EditUserComponent {

    constructor() {
        super();
    }

    override beforeOnInit(form: EditUserVarsForm): EditUserVarsForm{
        return form;
    }

    doNgOnDestroy(): void {
    }
}
