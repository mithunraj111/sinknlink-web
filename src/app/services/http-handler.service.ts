import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHandlerService {
    constructor(private http: Http) { }

    GET(url: string): Observable<any> {
        return this.http.get(url);
    }

    POST(url: string, data: any, options?: any): Observable<any> {
        if (options) {
            return this.http.post(url, data, { headers: options });
        } else {
            return this.http.post(url, data);
        }
    }

    PUT(url: string, data: any, id: number): Observable<any> {
        url = url + '/' + id;
        return this.http.put(url, data);
    }
}
