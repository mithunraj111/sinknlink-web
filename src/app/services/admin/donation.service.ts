import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class DonationService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    list(data, offset?, limit?): Observable<any> {
        let url = this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.DONATION.LIST;
        if (offset !== undefined) {
            url += '?offset=' + offset;
        }
        if (limit !== undefined) {
            url += '&limit=' + limit;
        }
        return this.httpHandler.POST(url, data);
    }
    create(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.DONATION.CREATE, data);
    }
    update(data, id): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.DONATION.UPDATE + id, data);
    }
    byId(id): Observable<any> {
        return this.httpHandler.GET(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.DONATION.GETBYID + id);
    }
    delete(data, id): Observable<any> {
        return this.httpHandler.DELETE(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.DONATION.DELETE, id, data);
    }
}
