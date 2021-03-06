import { Injectable, Injector } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

interface NgbDateFormat {
    year: number;
    month: number;
    day: number;
}
export let InjectorInstance: Injector;
@Injectable({
    providedIn: 'root'
})
export class CommonService {
    constructor(private ngbDateParserFormatter: NgbDateParserFormatter, private injector: Injector) {
        InjectorInstance = this.injector;
    }
    public getFormErrorMessage(formGroupObj: FormGroup, errorObj: any) {
        for (const key in formGroupObj.controls) {
            if (formGroupObj.controls.hasOwnProperty(key)) {
                const formControlObj = formGroupObj.controls[key];
                if (formControlObj instanceof FormControl) {
                    if (formControlObj.errors) {
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

    parseDate(dateString) {
        const date = new Date(dateString);
        return this.ngbDateParserFormatter.parse(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
    }
    formatDate(dateObj: NgbDateFormat) {
        return this.ngbDateParserFormatter.format(dateObj);
    }
    getCurrentDate(datepicker?) {
        if (datepicker) {
            return this.parseDate(new Date());
        } else {
            return new Date();
        }
    }
    globalSearch(tempFilter, event) {
        let val = '';
        if (!_.isNull(event) && !_.isUndefined(event)) {
            val = event.target.value.toLowerCase();
        }
        return tempFilter.filter(item => {
            for (const key in item) {
                if (('' + item[key]).toLocaleLowerCase().includes(val)) {
                    return ('' + item[key]).toLocaleLowerCase().includes(val);
                } else if (!_.isNull(item[key]) && typeof (item[key]) === 'object') {
                    _.assign(item, item[key]);
                    if (('' + item[key]).toLocaleLowerCase().includes(val)) {
                        return ('' + item[key]).toLocaleLowerCase().includes(val);
                    }
                }
            }
        });
    }
}
