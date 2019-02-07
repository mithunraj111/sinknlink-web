import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class DocumentService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    update(data, id): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.COMMON.DOCUMENT.UPDATE + id, data);
    }
}
