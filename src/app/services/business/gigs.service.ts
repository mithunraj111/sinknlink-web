import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class GigsService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    list(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.GIGS.LIST, data);
    }
    create(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.GIGS.CREATE, data);
    }
    update(data, id): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.GIGS.UPDATE + id, data);
    }
    byId(id): Observable<any> {
        return this.httpHandler.GET(this.endpoint + AppConstant.API_CONFIG.API_URL.BUSINESS.GIGS.GETBYID + id);
    }
}
