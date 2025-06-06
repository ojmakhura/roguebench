
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { ApplicationDTO } from '@app/model/bw/co/roguesystems/bench/application/application-dto';
import { ApplicationApi } from '@app/service/bw/co/roguesystems/bench/application/application-api';

export type ApplicationApiState = AppState<any, any> & {};

const initialState: ApplicationApiState = {
  data: null,
  dataList: [],
  dataPage: new Page<any>(),
  searchCriteria: new SearchObject<any>(),
  error: null,
  loading: false,
  success: false,
  messages: [],
  loaderMessage: ''
};

export const ApplicationApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any) => {
    const applicationApi = inject(ApplicationApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findById: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return applicationApi.findById(data.id,).pipe(
            tapResponse({
              next: (data: ApplicationDTO | any) => {
                patchState(
                  store,
                  {
                    data,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Found application with name ${data.name}`]
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
      getAll: rxMethod<void>(
        switchMap(() => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return applicationApi.getAll().pipe(
            tapResponse({
              next: (data: ApplicationDTO[] | any[]) => {
                patchState(
                  store,
                  {
                    data,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Found ${data.length} applications`]
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
      getAllPaged: rxMethod<{ pageNumber: number | any, pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return applicationApi.getAllPaged(data.pageNumber, data.pageSize,).pipe(
            tapResponse({
              next: (dataPage: Page<ApplicationDTO> | any) => {
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
      pagedSearch: rxMethod<{ criteria: SearchObject<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return applicationApi.pagedSearch(data.criteria,).pipe(
            tapResponse({
              next: (dataPage: Page<ApplicationDTO> | any) => {
                patchState(
                  store,
                  {
                    dataPage,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [
                      `Found ${dataPage.numberOfElements} of ${dataPage.totalElements} in page ${dataPage.number} of ${dataPage.totalPages}`,
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
      remove: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return applicationApi.remove(data.id,).pipe(
            tapResponse({
              next: (data: boolean | any) => {
                patchState(
                  store,
                  {
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Application removed successfully`]
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
      save: rxMethod<{ application: ApplicationDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return applicationApi.save(data.application,).pipe(
            tapResponse({
              next: (data: ApplicationDTO | any) => {
                patchState(
                  store,
                  {
                    data,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Application ${data.name} saved successfully`]
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
      search: rxMethod<{ criteria: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return applicationApi.search(data.criteria,).pipe(
            tapResponse({
              next: (dataList: ApplicationDTO[] | any[]) => {
                patchState(
                  store,
                  {
                    dataList,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Found ${dataList.length} applications.`]
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
      findByCode: rxMethod<{ code: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return applicationApi.findByCode(data.code,).pipe(
            tapResponse({
              next: (data: ApplicationDTO | any) => {
                patchState(
                  store,
                  {
                    data,
                    loading: false,
                    error: false,
                    // success: true,
                    // messages: [`Found ${dataList.length} applications.`]
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
