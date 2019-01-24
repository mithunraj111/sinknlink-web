import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpHandlerService } from './http-handler.service';
import * as _ from 'lodash';
import { AppConstant } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    apiEndPoint: string;

    constructor(private httpHandler: HttpHandlerService) {
        this.apiEndPoint = AppConstant.API_END_POINT;
    }
    public getFormErrorMessage(formGroupObj: FormGroup, errorObj: any) {
        for (const key in formGroupObj.controls) {
            if (formGroupObj.controls.hasOwnProperty(key)) {
                const formControlObj = formGroupObj.controls[key];
                if (formControlObj instanceof FormControl) {
                    if (formControlObj.errors) {
                        console.log(errorObj[key][Object.keys(formControlObj.errors)[0]]);
                        return errorObj[key][Object.keys(formControlObj.errors)[0]];
                    }
                }
            }
        }
    }

    getFormErrorMessageWithFormArray(formGroupObj: any, errorObj: any, name: string) {

        let formControlObj = {} as any;
        let pickedData = {} as any;
        for (const i in formGroupObj.controls) {
            if (formGroupObj.controls.hasOwnProperty(i)) {
                formControlObj = formGroupObj.controls[i];
                pickedData = _.get(formGroupObj.controls, name);
                if (formControlObj instanceof FormControl && !(pickedData === formControlObj)) {
                    if (formControlObj.errors) {
                        return errorObj[i][Object.keys(formControlObj.errors)[0]];
                    }
                } else if (pickedData === formControlObj && formControlObj instanceof FormArray) {

                    for (let k = 0; k < formControlObj.controls.length; k++) {
                        const newFormControlObj = _.get(formControlObj.controls[k], 'controls');
                        for (const j in newFormControlObj) {
                            if (newFormControlObj.hasOwnProperty(j)) {
                                const newControlObj = newFormControlObj[j];
                                if (newControlObj instanceof FormControl) {
                                    if (newControlObj.errors) {
                                        return errorObj[j][Object.keys(newControlObj.errors)[0]];
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }

    getLookUp(refkey:any): Observable<any>{
        return this.httpHandler.POST(this.apiEndPoint + AppConstant.API_CONFIG.API_URL.ADMIN.LOOKUP.LIST, refkey);        
    }

}
