import { Injectable } from '@angular/core';
import { AppConstant } from "../../app.constants";
import { Observable } from "rxjs";
import { HttpHandlerService } from "../http-handler.service";
@Injectable()

export class DashboardService{
    endpoint: string;

    constructor( private httpHandler: HttpHandlerService ){
        this.endpoint = AppConstant.API_END_POINT;
    }
    getCounts(data): Observable<any> {
        return this.httpHandler.POST( this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.DASHBOARD.ALL_COUNT, data );
    }
    employeebusinessCount(data): Observable<any> {
        return this.httpHandler.POST( this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.DASHBOARD.BIZ_COUNT, data );
    }
    searchCount(data): Observable<any> {
        return this.httpHandler.POST( this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.DASHBOARD.SEARCH_COUNT, data );
    }
}