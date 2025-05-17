import { Component, effect, inject, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/@shared/shared.module';
import { LoaderComponent } from '@app/@shared';
import { AuthorisationApiStore } from '@app/store/bw/co/roguesystems/bench/authorisation/authorisation-api.store';
import { AppEnvStore } from '@app/store/app-env.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, SharedModule, MaterialModule, LoaderComponent],
})
export class HomeComponent implements OnInit {

  private authorisationApiStore = inject(AuthorisationApiStore);
  private appEnv = inject(AppEnvStore);

  constructor() {

    effect(() => {
      console.log('appEnv', this.appEnv.realmRoles());

      this.authorisationApiStore.findAuthorisedApplications(
        {roles: this.appEnv.realmRoles().map((role) => role.value)}
      )
    });

    effect(() => {

      let apps = this.authorisationApiStore.authorisedApplications();
      console.log('authorisedApplications', apps);
    });
  }

  ngOnInit() {



  }
}
