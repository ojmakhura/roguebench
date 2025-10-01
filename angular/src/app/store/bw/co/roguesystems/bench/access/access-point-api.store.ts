
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { AccessPointListDTO } from '@app/model/bw/co/roguesystems/bench/access/access-point-list-dto';
import { AccessPointCriteria } from '@app/model/bw/co/roguesystems/bench/access/access-point-criteria';
import { AccessPointDTO } from '@app/model/bw/co/roguesystems/bench/access/access-point-dto';
import { AccessPointApi } from '@app/service/bw/co/roguesystems/bench/access/access-point-api';
import { RestApiResponse } from '@app/model/rest-api-response.model';

export type AccessPointApiState = AppState<any, any> & {};

const initialState: AccessPointApiState = {
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

export const AccessPointApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any) => {
    const accessPointApi = inject(AccessPointApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findApplicationAccessPoints: rxMethod<{applicationId: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return accessPointApi.findApplicationAccessPoints(data.applicationId, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AccessPointListDTO[] | any[]>) => {
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
      findApplicationAccessPointsPaged: rxMethod<{applicationId: string | any , pageNumber: number | any , pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return accessPointApi.findApplicationAccessPointsPaged(data.applicationId, data.pageNumber, data.pageSize, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<Page<AccessPointListDTO> | any>) => {
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
          return accessPointApi.findById(data.id, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AccessPointDTO | any>) => {
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
      findByParent: rxMethod<{parentId: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return accessPointApi.findByParent(data.parentId, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AccessPointListDTO[] | any[]>) => {
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
      getAll: rxMethod<void>(
        switchMap(() => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return accessPointApi.getAll().pipe(
            tapResponse({
              next: (response: RestApiResponse<AccessPointListDTO[] | any[]>) => {
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
          return accessPointApi.getAllPaged(data.pageNumber, data.pageSize, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<Page<AccessPointListDTO> | any>) => {
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
      pagedSearch: rxMethod<{criteria: SearchObject<AccessPointCriteria> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return accessPointApi.pagedSearch(data.criteria, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<Page<AccessPointListDTO> | any>) => {
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
      pagedSearchOr: rxMethod<{criteria: SearchObject<AccessPointCriteria> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return accessPointApi.pagedSearchOr(data.criteria, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<Page<AccessPointListDTO> | any>) => {
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
          return accessPointApi.remove(data.id, ).pipe(
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
      save: rxMethod<{accessPoint: AccessPointDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return accessPointApi.save(data.accessPoint, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AccessPointDTO | any>) => {
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
      search: rxMethod<{criteria: AccessPointCriteria | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return accessPointApi.search(data.criteria, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AccessPointListDTO[] | any[]>) => {
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
      searchOr: rxMethod<{criteria: AccessPointCriteria | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return accessPointApi.searchOr(data.criteria, ).pipe(
            tapResponse({
              next: (response: RestApiResponse<AccessPointListDTO[] | any[]>) => {
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
