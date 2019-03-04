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
    getAreaWiseCount(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.AREA_COUNT, data);
    }
    getCategoryWiseCount(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.CATEGORY_COUNT, data);
    }
    getConsumerCount(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.CONSUMER_COUNT, data);
    }
    areawiseDealerCount(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.DEALER_COUNT, data);
    }
    customerDetailReport(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.CUSTOMER_DETAIL, data);
    }
    paymentReport(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.PAYMENT_STATUS, data);
    }
    customerDetailReportDownload(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.CUSTOMER_DETAIL +"?download=true", data);
    }
    dealerReportDownload(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.REPORT.DEALER_COUNT +"?download=true", data);
    }

}
