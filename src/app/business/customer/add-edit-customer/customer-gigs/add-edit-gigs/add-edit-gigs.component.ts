import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { AppConstant } from '../../../../../app.constants';
import { BusinessService, LocalStorageService, CommonService } from '../../../../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../../../../../app-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
@Component({
    selector: 'app-add-edit-gig',
    templateUrl: './add-edit-gigs.component.html'
})
export class AddEditGigComponent implements OnInit, OnChanges {
    userstoragedata = {} as any;
    @Input() customerObj = {} as any;
    gigForm: FormGroup;
    gigErrObj = AppMessages.VALIDATION.GIG;
    @Input() gigObj = {} as any;
    @Output() notifyGigEntry: EventEmitter<any> = new EventEmitter();
    posttypes = AppConstant.POST_TYPES;
    buttonTxt = AppConstant.BUTTON_TXT.SAVE;
    formTitle = AppConstant.FORM_TITLE.GIG.ADD;
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
            salary: [''],
            contactperson: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            contactmobile: ['', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
            description: ['', Validators.maxLength(500)],
            status: [AppConstant.STATUS_ACTIVE, Validators.required]
        });
        this.gigObj = {};
    }
    ngOnChanges(changes: SimpleChanges) {
        if (!_.isUndefined(changes.gigObj) && !_.isEmpty(changes.gigObj.currentValue)) {
            this.buttonTxt = AppConstant.BUTTON_TXT.UPDATE;
            this.formTitle = AppConstant.FORM_TITLE.GIG.UPDATE;
            this.gigObj = changes.gigObj.currentValue;
            this.editGig(this.gigObj);
        } else {
            this.initGigForm();
            this.buttonTxt = AppConstant.BUTTON_TXT.SAVE;
            this.formTitle = AppConstant.FORM_TITLE.GIG.ADD;
        }
    }
    editGig(data) {
        this.gigObj = data;
        this.gigForm.patchValue(this.gigObj);
    }
    close() {
        this.notifyGigEntry.emit({ close: true });
    }
    callParent(data) {
        this.notifyGigEntry.emit(data);
    }
    saveOrUpdateGig() {
        let errMessage: any;
        if (_.isEmpty(this.customerObj)) {
            this.bootstrapAlertService.showError(AppMessages.VALIDATION.BUSINESS.common);
            return false;
        } else {
            if (!this.gigForm.valid) {
                errMessage = this.commonService.getFormErrorMessage(this.gigForm, this.gigErrObj);
                this.bootstrapAlertService.showError(errMessage);
                return false;
            } else {
                const data = this.gigForm.value;
                const formdata = { ...data } as any;
                formdata.membershipid = this.customerObj.membershipid;
                formdata.updatedby = this.userstoragedata.fullname;
                formdata.updateddt = new Date();
                if (!_.isUndefined(this.gigObj) && !_.isUndefined(this.gigObj.gigid) && !_.isEmpty(this.gigObj)) {
                    formdata.status = data.status;
                    this.gigsService.update(data, this.gigObj.gigid).subscribe(res => {
                        const response = JSON.parse(res._body);
                        if (response.status) {
                            this.bootstrapAlertService.showSucccess(response.message);
                            this.initGigForm();
                            this.callParent(response.data);
                        } else {
                            this.bootstrapAlertService.showError(response.message);
                        }
                    });
                } else {
                    formdata.status = AppConstant.STATUS_ACTIVE;
                    formdata.createdby = this.userstoragedata.fullname;
                    formdata.createddt = new Date();
                    this.gigsService.create(formdata).subscribe((res) => {
                        const response = JSON.parse(res._body);
                        if (response.status) {
                            this.bootstrapAlertService.showSucccess(response.message);
                            this.initGigForm();
                            this.callParent(response.data);
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
}
