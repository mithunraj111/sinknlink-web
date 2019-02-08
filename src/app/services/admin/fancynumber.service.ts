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
    getList(data: any, allocated?): Observable<any> {
        let url = this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.FANCYNO.LIST;

        if(allocated) url += `?allocatednos=true`

        return this.httpHandler.POST(url, data);
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
    updateallocation(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.FANCYNO.UPDATEALLOCATED, data);
    }
}
