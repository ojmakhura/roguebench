
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { AuthorisationDTO } from '@app/model/bw/co/roguesystems/bench/authorisation/authorisation-dto';
import { AuthorisationListDTO } from '@app/model/bw/co/roguesystems/bench/authorisation/authorisation-list-dto';
import { AuthorisationCriteria } from '@app/model/bw/co/roguesystems/bench/authorisation/authorisation-criteria';
import { AuthorisationApi } from '@app/service/bw/co/roguesystems/bench/authorisation/authorisation-api';
import { RestApiResponse } from '@app/model/rest-api-response.model';

export type AuthorisationApiState = AppState<any, any> & {};

const initialState: AuthorisationApiState = {
  data: null,
  dataList: [],
  dataPage: new Page<any>(),
  searchCriteria: new SearchObject<any>(),
  status: 0,
  loading: false,
  success: false,
  messages: [],
  loaderMessage: '',
  details: '',
  error: false
};

export const AuthorisationApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any) => {
    const authorisationApi = inject(AuthorisationApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findApplicationAuthorisationPaged: rxMethod<{applicationId: string | any , pageNumber: number | any , pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findApplicationAuthorisationPaged(data.applicationId, data.pageNumber, data.pageSize, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<Page<AuthorisationListDTO> | any>) => {
                patchState(
                  store, 
                  {
                    dataPage: response?.data,
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      findApplicationAuthorisations: rxMethod<{applicationId: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findApplicationAuthorisations(data.applicationId, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AuthorisationListDTO[] | any[]>) => {
                patchState(
                  store, 
                  {
                    dataList: response?.data, 
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      findAuthorisedApplications: rxMethod<{roles: Set<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findAuthorisedApplications(data.roles, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AuthorisationListDTO[] | any[]>) => {
                patchState(
                  store, 
                  {
                    dataList: response?.data, 
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      findAuthorisedApplicationsPaged: rxMethod<{roles: Set<string> | any , pageNumber: number | any , pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findAuthorisedApplicationsPaged(data.roles, data.pageNumber, data.pageSize, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<Page<AuthorisationListDTO> | any>) => {
                patchState(
                  store, 
                  {
                    dataPage: response?.data,
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      findById: rxMethod<{id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findById(data.id, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AuthorisationDTO | any>) => {
                patchState(
                  store, 
                  {
                    data: response?.data,
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      findByParentAndRoles: rxMethod<{parentId: string | any , roles: Set<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findByParentAndRoles(data.parentId, data.roles, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AuthorisationListDTO[] | any[]>) => {
                patchState(
                  store, 
                  {
                    dataList: response?.data, 
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      findByRolesAndUrl: rxMethod<{applicationId: string | any , url: string | any , roles: Set<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findByRolesAndUrl(data.applicationId, data.url, data.roles, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AuthorisationListDTO[] | any[]>) => {
                patchState(
                  store, 
                  {
                    dataList: response?.data, 
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      findByRolesAndUrlPaged: rxMethod<{applicationId: string | any , url: string | any , roles: Set<string> | any , pageNumber: number | any , pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findByRolesAndUrlPaged(data.applicationId, data.url, data.roles, data.pageNumber, data.pageSize, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<Page<AuthorisationListDTO> | any>) => {
                patchState(
                  store, 
                  {
                    dataPage: response?.data,
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      findMyAuthorisedApplications: rxMethod<{application: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findMyAuthorisedApplications(data.application, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AuthorisationListDTO[] | any[]>) => {
                patchState(
                  store, 
                  {
                    dataList: response?.data, 
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      findRestrictedViewItems: rxMethod<{applicationId: string | any , url: string | any , roles: Set<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findRestrictedViewItems(data.applicationId, data.url, data.roles, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AuthorisationListDTO[] | any[]>) => {
                patchState(
                  store, 
                  {
                    dataList: response?.data, 
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      getAccessTypeCodeAuthorisations: rxMethod<{applicationId: string | any , roles: Set<string> | any , accessPointTypeCodes: Set<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.getAccessTypeCodeAuthorisations(data.applicationId, data.roles, data.accessPointTypeCodes, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AuthorisationListDTO[] | any[]>) => {
                patchState(
                  store, 
                  {
                    dataList: response?.data, 
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      getAccessTypeCodeAuthorisationsPaged: rxMethod<{applicationId: string | any , roles: Set<string> | any , accessPointTypeCodes: Set<string> | any , pageNumber: number | any , pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.getAccessTypeCodeAuthorisationsPaged(data.applicationId, data.roles, data.accessPointTypeCodes, data.pageNumber, data.pageSize, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<Page<AuthorisationListDTO> | any>) => {
                patchState(
                  store, 
                  {
                    dataPage: response?.data,
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      getAll: rxMethod<void>(
        switchMap(() => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.getAll().pipe(
            tapResponse({
              next: (response: RestApiResponse<AuthorisationListDTO[] | any[]>) => {
                patchState(
                  store, 
                  {
                    dataList: response?.data, 
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      getAllPaged: rxMethod<{pageNumber: number | any , pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.getAllPaged(data.pageNumber, data.pageSize, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<Page<AuthorisationListDTO> | any>) => {
                patchState(
                  store, 
                  {
                    dataPage: response?.data,
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      remove: rxMethod<{id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.remove(data.id, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<boolean | any>) => {
                patchState(
                  store, 
                  {
                    data: response?.data,
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      save: rxMethod<{authorisation: AuthorisationDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.save(data.authorisation, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AuthorisationDTO | any>) => {
                patchState(
                  store, 
                  {
                    data: response?.data,
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      search: rxMethod<{criteria: AuthorisationCriteria | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.search(data.criteria, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AuthorisationListDTO[] | any[]>) => {
                patchState(
                  store, 
                  {
                    dataList: response?.data, 
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
      searchPaged: rxMethod<{criteria: SearchObject<AuthorisationCriteria> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.searchPaged(data.criteria, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<Page<AuthorisationListDTO>[] | any[]>) => {
                patchState(
                  store, 
                  {
                    dataList: response?.data, 
                    loading: false, 
                    status: (response?.status) ,
                    success: (response?.success || false), 
                    messages: [response.message || 'Success!!'],
                    error: false,
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, { 
                    status: (error?.status || 0), 
                    loading: false, 
                    success: false,
                    error: true,
                    messages: [error.error.message || 'An error occurred'], 
                  }
                );
              },
            }),
          );
        }),
      ),
    }
  }),
);
