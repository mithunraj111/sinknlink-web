import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class ReportService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    getAreaWiseCount(data,download?): Observable<any> {
        let url =  this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.AREA_COUNT ;
        if(download){
            url += `?download=${true}`
        }
        return this.httpHandler.POST(url, data);
    }
    getCategoryWiseCount(data,download?): Observable<any> {
        let url =  this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.CATEGORY_COUNT ;
        if(download){
            url += `?download=${true}`
        }
        return this.httpHandler.POST(url, data);
    }
    getConsumerCount(data,download?): Observable<any> {
        let url =  this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.CONSUMER_COUNT ;
        if(download){
            url += `?download=${true}`
        }
        return this.httpHandler.POST(url, data);
    }
    areawiseDealerCount(data,download?): Observable<any> {
        let url =  this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.DEALER_COUNT ;
        if(download){
            url += `?download=${true}`
        }
        return this.httpHandler.POST(url, data);
    }
    customerDetailReport(data,download?): Observable<any> {
        let url =  this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.CUSTOMER_DETAIL ;
        if(download){
            url += `?download=${true}`
        }
        return this.httpHandler.POST(url, data);
    }
    paymentReport(data,download?): Observable<any> {
        let url = this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.PAYMENT_STATUS;
        if(download){
            url += `?download=${true}`
        }
        return this.httpHandler.POST(url, data);
    }
    subscriptionDueReport(data,download?): Observable<any> {
        let url =  this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.SUBSCRIPTION_DUE ;
        if(download){
            url += `?download=${true}`
        }
        return this.httpHandler.POST(url, data);
    }
}
