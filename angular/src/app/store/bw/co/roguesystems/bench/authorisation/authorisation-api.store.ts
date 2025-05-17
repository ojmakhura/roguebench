
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

export type AuthorisationApiState = AppState<any, any> & {
  authorisedApplications: AuthorisationDTO[];
};

const initialState: AuthorisationApiState = {
  data: null,
  dataList: [],
  dataPage: new Page<any>(),
  searchCriteria: new SearchObject<any>(),
  error: null,
  loading: false,
  success: false,
  messages: [],
  loaderMessage: '',
  authorisedApplications: []
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
              next: (dataPage: Page<AuthorisationListDTO> | any) => {
                patchState(
                  store,
                  {
                    dataPage,
                     loading: false,
                     error: false,
                     success: true,
                     messages: [`Found ${dataPage.numberOfElements} of ${dataPage.totalElements} in page ${dataPage.number} of ${dataPage.totalPages}`,]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
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
              next: (dataList: AuthorisationListDTO[] | any[]) => {
                patchState(
                  store,
                  {
                     authorisedApplications: dataList,
                     loading: false,
                     error: false,
                     success: true,
                     messages: [`Found ${data.length} authorisations.`]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
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
              next: (dataPage: Page<AuthorisationListDTO> | any) => {
                patchState(
                  store,
                  {
                    dataPage,
                     loading: false,
                     error: false,
                     success: true,
                     messages: [`Found ${dataPage.numberOfElements} of ${dataPage.totalElements} in page ${dataPage.number} of ${dataPage.totalPages}`,]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
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
          return authorisationApi.findAuthorisedApplications(data.roles).pipe(
            tapResponse({
              next: (dataList: AuthorisationListDTO[] | any[]) => {
                patchState(
                  store,
                  {
                     dataList,
                     loading: false,
                     error: false,
                     success: true,
                     messages: [`Found ${data.length} authorisations.`]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
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
              next: (data: AuthorisationDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Authorisation found.`],
                });
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
                  }
                );
              },
            }),
          );
        }),
      ),
      findByRolesAndUrl: rxMethod<{applicationId: string | any , url: string | any , roles: Array<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findByRolesAndUrl(data.applicationId, data.url, data.roles, ).pipe(
            tapResponse({
              next: (dataList: AuthorisationDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${data.length} authorisations.`],
                });
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
                  }
                );
              },
            }),
          );
        }),
      ),
      findByRolesAndUrlPaged: rxMethod<{applicationId: string | any , url: string | any , roles: Array<string> | any , pageNumber: number | any , pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findByRolesAndUrlPaged(data.applicationId, data.url, data.roles, data.pageNumber, data.pageSize, ).pipe(
            tapResponse({
              next: (dataPage: AuthorisationDTO | any) => {
                patchState(store, {
                  dataPage,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [
                    `Found ${dataPage.numberOfElements} of ${dataPage.totalElements} in page ${dataPage.number} of ${dataPage.totalPages}`,
                  ],
                });
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
                  }
                );
              },
            }),
          );
        }),
      ),
      findRestrictedViewItems: rxMethod<{applicationId: string | any , url: string | any , roles: Array<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.findRestrictedViewItems(data.applicationId, data.url, data.roles, ).pipe(
            tapResponse({
              next: (dataList: AuthorisationDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  // success: true,
                  // messages: [`Found ${data.length} authorisations.`],
                });
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
                  }
                );
              },
            }),
          );
        }),
      ),
      getAccessTypeCodeAuthorisations: rxMethod<{applicationId: string | any , roles: Array<string> | any , accessPointTypeCodes: Array<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.getAccessTypeCodeAuthorisations(data.applicationId, data.roles, data.accessPointTypeCodes, ).pipe(
            tapResponse({
              next: (dataList: AuthorisationDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${data.length} authorisations.`],
                });
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
                  }
                );
              },
            }),
          );
        }),
      ),
      getAccessTypeCodeAuthorisationsPaged: rxMethod<{applicationId: string | any , roles: Array<string> | any , accessPointTypeCodes: Array<string> | any , pageNumber: number | any , pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return authorisationApi.getAccessTypeCodeAuthorisationsPaged(data.applicationId, data.roles, data.accessPointTypeCodes, data.pageNumber, data.pageSize, ).pipe(
            tapResponse({
              next: (dataPage: Page<AuthorisationDTO> | any) => {
                patchState(store, {
                  dataPage,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [
                    `Found ${dataPage.numberOfElements} of ${dataPage.totalElements} in page ${dataPage.number} of ${dataPage.totalPages}`,
                  ],
                });
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
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
              next: (dataList: AuthorisationDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${dataList.length} authorisations.`],
                });
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
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
              next: (dataPage: Page<AuthorisationDTO> | any) => {
                patchState(store, {
                  dataPage,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [
                    `Found ${dataPage.numberOfElements} of ${dataPage.totalElements} in page ${dataPage.number + 1} of ${dataPage.totalPages}`,
                  ],
                });
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
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
              next: (data: boolean | any) => {
                patchState(store, {
                  data: new AuthorisationDTO(),
                  dataList: [],
                  dataPage: new Page<any>(),
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Authorisation removed.`],
                });
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
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
              next: (data: AuthorisationDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Authorisation saved.`],
                });
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
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
              next: (dataList: AuthorisationDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${dataList.length} authorisations.`],
                });
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
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
              next: (dataPage: Page<AuthorisationListDTO> | any) => {
                patchState(
                  store,
                  {
                     dataPage,
                     loading: false,
                     error: false,
                     success: true,
                     messages: [
                      `Found ${dataPage.numberOfElements} of ${dataPage.totalElements} in page ${dataPage.number + 1} of ${dataPage.totalPages}`,
                     ]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                    error,
                    loading: false,
                    success: false,
                    messages: [error?.error ? error.error : error]
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
