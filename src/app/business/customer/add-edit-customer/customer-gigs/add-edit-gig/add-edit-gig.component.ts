

import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../../../../app.constants';
import { BusinessService, LocalStorageService, CommonService } from '../../../../../services';
import * as _ from 'lodash';

@Component({
    selector: 'app-add-edit-gig',
    templateUrl: './add-edit-gig.component.html'
})
export class AddEditGigComponent implements OnInit, OnChanges {
    gigForm: FormGroup;
    gigErrObj = {} as any;
    @Input() gigObj = {} as any;
    userstoragedata = {} as any;
    @Input() customerid: number;
    @Output() notifyGigChange: EventEmitter<any> = new EventEmitter();

    buttonTxt;
    formTitle;
    posttypes = AppConstant.POST_TYPES;
    constructor(private bootstrapAlertService: BootstrapAlertService,
        private commonService: CommonService,
        private gigsService: BusinessService.GigsService,
        private fb: FormBuilder,
        private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
        this.initGigForm();
    }

    initGigForm() {
        this.gigForm = this.fb.group({
            postname: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            posttype: [null, Validators.required],
            salary: [null, Validators.required],
            contactperson: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            contactmobile: [''],
            description: ['', Validators.maxLength(500)],
            status: [true, Validators.required]
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!_.isUndefined(changes.gigObj) && !_.isEmpty(changes.gigObj.currentValue)
            && !_.isUndefined(changes.gigObj.currentValue.refid)) {
            this.buttonTxt = AppConstant.BUTTON_TXT.UPDATE;
            this.formTitle = AppConstant.FORM_TITLE.GIG.UPDATE;
            this.gigObj = changes.gigObj.currentValue;
        } else {
            this.initGigForm();
            this.formTitle = AppConstant.FORM_TITLE.GIG.ADD;
            this.buttonTxt = AppConstant.BUTTON_TXT.SAVE;
        }

    }
    saveOrUpdateGig() {
        let errMessage: any;
        if (this.gigForm.status === AppConstant.STATUS_INVALID) {
            errMessage = this.commonService.getFormErrorMessage(this.gigForm, this.gigErrObj);
            this.bootstrapAlertService.showError(errMessage);
            return false;
        } else {
            const data = this.gigForm.value;
            const formdata = { ...data } as any;
            formdata.membershipid = this.customerid;
            formdata.updatedby = this.userstoragedata.fullname;
            formdata.updateddt = new Date();
            if (!_.isUndefined(this.gigObj) && !_.isUndefined(this.gigObj.gigid) && !_.isEmpty(this.gigObj)) {
                formdata.status = data.status;
                this.gigsService.update(formdata, this.gigObj.gigid).subscribe(res => {
                    const response = JSON.parse(res._body);
                    if (response.status) {
                        this.bootstrapAlertService.showSucccess(response.message);
                    } else {
                        this.bootstrapAlertService.showError(response.message);
                    }
                }, err => {
                    this.bootstrapAlertService.showError(err.message);
                });
            } else {
                formdata.status = AppConstant.STATUS_ACTIVE;
                formdata.createdby = this.userstoragedata.fullname;
                formdata.createddt = new Date();
                this.gigsService.create(formdata).subscribe((res) => {
                    const response = JSON.parse(res._body);
                    if (response.status) {
                        this.bootstrapAlertService.showSucccess(response.message);
                    } else {
                        this.bootstrapAlertService.showError(response.message);
                    }
                }, err => {
                    this.bootstrapAlertService.showError(err.message);
                });
            }
        }
    }
    close() {
        this.notifyGigChange.next({ close: true });
    }
}
