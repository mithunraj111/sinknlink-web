import { Injectable } from '@angular/core';
import { HttpHandlerService } from '../http-handler.service';
import { Observable } from 'rxjs';
import { AppConstant } from '../../app.constants';

@Injectable()
export class AdvertisementService{
    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    list(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.ADVERTISEMENT.LIST, data);
    }
    create(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.ADVERTISEMENT.CREATE, data);
    }
    update(data, id): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.ADVERTISEMENT.EDIT + id, data);
    }
    byId(id): Observable<any> {
        return this.httpHandler.GET(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.ADVERTISEMENT.GETBYID + id);
    }
    delete(data, id): Observable<any> {
        return this.httpHandler.DELETE(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.ADVERTISEMENT.DELETE, id, data);
    }
    
}
