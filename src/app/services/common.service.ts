import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    constructor(private ngbDateParserFormatter: NgbDateParserFormatter) {
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

    parseDate(data,toTimeStamp?) {
        var date = new Date(data);
        if(toTimeStamp) return this.ngbDateParserFormatter.format(data);
        else return this.ngbDateParserFormatter.parse(date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getUTCDate());
    }

}
