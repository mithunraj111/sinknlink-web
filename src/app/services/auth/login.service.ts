import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
import { AppConstant } from '../../app.constants';
@Injectable()
export class LoginService {

    endpoint: string;
    constructor(private httpHandler: HttpHandlerService) {
        this.endpoint = AppConstant.API_END_POINT;
    }
    login(data): Observable<any> {
        data.auth = AppConstant.AUTHENTICATION;
        return this.httpHandler.POST(this.endpoint + AppConstant.API_CONFIG.API_URL.AUTH.LOGIN, data);
    }
}
