import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class CouponService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    list(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.COUPONS.LIST, data);
    }
    create(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.COUPONS.CREATE, data);
    }
    update(data, id): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.COUPONS.UPDATE + id, data);
    }
    byId(id): Observable<any> {
        return this.httpHandler.GET(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.COUPONS.GETBYID + id);
    }
    delete(data, id): Observable<any> {
        return this.httpHandler.DELETE(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.COUPONS.DELETE, id, data);
    }
}
