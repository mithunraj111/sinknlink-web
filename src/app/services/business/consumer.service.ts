import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class ConsumerService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    list(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CONSUMER.LIST, data);
    }
    create(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CONSUMER.CREATE, data);
    }
    update(data, id): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CONSUMER.UPDATE + id, data);
    }
    byId(id): Observable<any> {
        return this.httpHandler.GET(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CONSUMER.GETBYID + id);
    }
    consumerCouponsList(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CONSUMERCOUPON.LIST, data);
    }
    consumerCouponsEdit(data, id): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CONSUMERCOUPON.UPDATE + id, data);
    }
    consumerFavs(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CONSUMERFAVORITES.LIST, data);
    }
    consumerReviews(data,limit?,offset?): Observable<any> {
        let url = this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.REVIEWS.LIST;
        if (offset) {
            url += `?offset=${offset}`
        }
        if (limit) {
            url += `&limit=${limit}`
        }
        return this.httpHandler.POST(url, data);
    }
    delete(data, id): Observable<any> {
        return this.httpHandler.DELETE(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.CONSUMER.DELETE, id, data);
    }
}
