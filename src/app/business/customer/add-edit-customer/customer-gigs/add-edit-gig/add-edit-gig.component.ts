

import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
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
    @Input() visible = false;
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
        console.log(changes);
        if (!_.isUndefined(changes.visible) && !_.isUndefined(changes.visible.currentValue)) {
            if (this.visible) {
                document.querySelector('#gigmodal').classList.add('md-show');
            } else {
                document.querySelector('#gigmodal').classList.remove('md-show');
            }
        }

    }
    saveOrUpdateLocation() {
        let errMessage: any;
        if (this.gigForm.status === AppConstant.STATUS_INVALID) {
            errMessage = this.commonService.getFormErrorMessage(this.gigForm, this.gigErrObj);
            this.bootstrapAlertService.showError(errMessage);
            return false;
        } else {
            const data = this.gigForm.value;
            const formdata = { ...data } as any;
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
}
