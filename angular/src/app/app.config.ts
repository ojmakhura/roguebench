import { ApplicationConfig, isDevMode, importProvidersFrom } from '@angular/core';
import { RouteReuseStrategy, provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
import { UseCaseScope } from './utils/use-case-scope';
import { withInterceptors, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouteReusableStrategy } from './@shared';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { apiPrefixInterceptor } from './@core/http/api-prefix.interceptor';
import { errorHandlerInterceptor } from './@core/http/error-handler.interceptor';
import { AutoRefreshTokenService, createInterceptorCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, IncludeBearerTokenCondition, includeBearerTokenInterceptor, provideKeycloak, UserActivityService, withAutoRefreshToken } from 'keycloak-angular';
import { provideToastr } from 'ngx-toastr';

export const provideKeycloakAndInterceptor = (env: any) => {
  const urlConditions = [
    createInterceptorCondition<IncludeBearerTokenCondition>({
      // eslint-disable-next-line no-useless-escape
      urlPattern: new RegExp(`^${env.apiUrl}(\/.*)?$`, 'i'),
      bearerPrefix: 'Bearer',
    }),
    createInterceptorCondition<IncludeBearerTokenCondition>({
      // eslint-disable-next-line no-useless-escape
      urlPattern: new RegExp(`^${env.authDomain}(\/.*)?$`, 'i'),
      bearerPrefix: 'Bearer',
    }),
    // you can add more interceptors in this array...
  ];

  // in our case, we put the identity configuration in the environment files
  // const { identityServerUrl, clientId, realm } = environment.auth;

  return [
    provideKeycloak({
      config: {
        url: env.authDomain,
        realm: env.realm,
        clientId: env.clientId,
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: true,
      },
      features: [
        withAutoRefreshToken({
          sessionTimeout: 300000,
          onInactivityTimeout: 'logout',
        }),
      ],
      providers: [
        AutoRefreshTokenService,
        UserActivityService,
      ],
    }),
    { provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, useValue: urlConditions },
  ];
};

export const appConfig = (env: any) => {

  return {

    providers: [
      UseCaseScope,
      provideRouter(routes, withHashLocation()),
      provideAnimations(),
      provideKeycloakAndInterceptor(env),
      provideHttpClient(
        withInterceptorsFromDi(),
        withInterceptors([
          apiPrefixInterceptor,
          errorHandlerInterceptor,
          includeBearerTokenInterceptor
        ])
      ),
      provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
      provideToastr(),
      importProvidersFrom(
        StoreDevtoolsModule.instrument({}),
        TranslateModule.forRoot(),
        ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
      ),
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
      {
        provide: RouteReuseStrategy,
        useClass: RouteReusableStrategy,
      },
    ],
  } as ApplicationConfig;
};
