// Generated by andromda-angular cartridge (service\service.impl.ts.vsl) CAN EDIT
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessPointTypeDTO } from '@app/model/bw/co/roguesystems/bench/access/type/access-point-type-dto';
import { HttpClient } from '@angular/common/http';
import { Page } from '@app/model/page.model';
import { SearchObject } from '@app/model/search-object';

@Injectable({
  providedIn: 'root'
})
export class AccessPointTypeApi {
    
    protected path = '/access/type';

    private http = inject(HttpClient);

    public findById(id: string | any ): Observable<AccessPointTypeDTO | any> {

        return this.http.get<AccessPointTypeDTO | any>(this.path + `/${id}`);
    }

    public getAll(): Observable<AccessPointTypeDTO[] | any[]> {

        return this.http.get<AccessPointTypeDTO[] | any[]>(this.path);
    }

    public getAllPaged(pageNumber: number | any , pageSize: number | any ): Observable<AccessPointTypeDTO | any> {

        return this.http.get<AccessPointTypeDTO | any>(this.path + `/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    public pagedSearch(criteria: SearchObject<string> | any ): Observable<AccessPointTypeDTO | any> {

        return this.http.post<AccessPointTypeDTO | any>(this.path + `/search/paged`, criteria);
    }

    public remove(id: string | any ): Observable<boolean | any> {

        return this.http.delete<boolean | any>(this.path + `/${id}`);
    }

    public save(accessPointType: AccessPointTypeDTO | any ): Observable<AccessPointTypeDTO | any> {

        return this.http.post<AccessPointTypeDTO | any>(this.path, accessPointType);
    }

    public search(criteria: string | any ): Observable<AccessPointTypeDTO[] | any[]> {

        return this.http.get<AccessPointTypeDTO[] | any[]>(this.path + `/search?criteria=${criteria}`);
    }

}
