import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class FancyNumberService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    addNumbers(data): Observable<any> {
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.ADMIN.FANCYNO.CREATE, data);
    }
}
