import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AppConstant } from '../app.constants';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable()
export class HttpHandlerService {
    userstoragedata: any;
    headers: any;
    constructor(private http: Http, private localStorageService: LocalStorageService) {
        this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
        this.headers = new Headers();
        this.headers.append('Authorization',
            this.userstoragedata.token);
    }

    GET(url: string, options?): Observable<any> {
        return this.http.get(url, { headers: this.headers });
    }

    POST(url: string, data: any, options?: any): Observable<any> {
        if (data.auth) {
            return this.http.post(url, data);
        } else {
            return this.http.post(url, data, { headers: this.headers });
        }
    }

    PUT(url: string, data: any, id: number, options?: any): Observable<any> {
        url = url + '/' + id;
        return this.http.put(url, data, { headers: this.headers });
    }

    DELETE(url: string, id: number, data?: any, options?: any): Observable<any> {
        url = url + id;
        return this.http.delete(url, { headers: this.headers });
    }
}
