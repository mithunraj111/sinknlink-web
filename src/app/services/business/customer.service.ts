import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class CustomerService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    list(data, type?): Observable<any> {
        let url = this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CUSTOMER.LIST;
        if (type) {
            url += `?type=${type}`;
        }
        return this.httpHandler.POST(url, data);
    }
    create(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CUSTOMER.CREATE, data);
    }
    update(data, id): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CUSTOMER.UPDATE + id, data);
    }
    byId(id): Observable<any> {
        return this.httpHandler.GET(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CUSTOMER.GETBYID + id);
    }
    delete(data, id): Observable<any> {
        return this.httpHandler.DELETE(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CUSTOMER.DELETE, id, data);
    }
}
