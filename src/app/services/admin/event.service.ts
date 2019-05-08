import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class EventService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    list(data, upcoming?): Observable<any> {
        let url = this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.EVENT.LIST;
        if (upcoming) {
            url += `?upcoming=${true}`;
        }
        return this.httpHandler.POST(url, data);
    }
    create(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.EVENT.CREATE, data);
    }
    update(data, id): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.EVENT.UPDATE + id, data);
    }
    byId(id): Observable<any> {
        return this.httpHandler.GET(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.EVENT.GETBYID + id);
    }
    getLocations(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.MASTERS.LOCATION.LIST, data);
    }
    addDocument(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.DOCUMENT.CREATE, data);
    }
    updateDocument(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.DOCUMENT.CREATE, data);
    }
    delete(data, id): Observable<any> {
        return this.httpHandler.DELETE(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.EVENT.DELETE, id, data);
    }
}
