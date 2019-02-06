import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class FancyNumberService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    addNumbers(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.FANCYNO.CREATE, data);
    }
    getList(data: any): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.FANCYNO.LIST, data);
    }
    editNumber(data: any, pk: string): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.FANCYNO.EDIT + `/${pk}`, data);
    }
    getParentBix(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CUSTOMER.LIST + `?type=` + "getParentBiz", data);
    }
    blockNumbers(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.FANCYNO.BLOCK, data);
    }
    allocateNumbers(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.FANCYNO.ALLOCATE, data);
    }
}
