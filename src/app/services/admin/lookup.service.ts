import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class LookupService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    list(data, multiple?): Observable<any> {
        let url;

        if (multiple) {
            url = this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.LOOKUP.LIST + "?multiple=true";
        } else {
            url = this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.LOOKUP.LIST;
        }

        return this.httpHandler.POST(url, data);
    }
    create(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.LOOKUP.CREATE, data);
    }
    update(data, id): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.LOOKUP.UPDATE + id, data);
    }
    byId(id): Observable<any> {
        return this.httpHandler.GET(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.LOOKUP.GETBYID + id);
    }
    delete(data, id): Observable<any> {
        return this.httpHandler.DELETE(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.LOOKUP.DELETE, id, data);
    }
}
