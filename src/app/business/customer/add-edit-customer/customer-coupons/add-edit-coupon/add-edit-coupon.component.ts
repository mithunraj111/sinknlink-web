import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../../app.constants';
import { AppMessages } from '../../../../../app-messages';
import { BusinessService, LocalStorageService, CommonService } from '../../../../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { SettingService } from '../../../../../services/masters';
@Component({
    selector: 'app-add-edit-coupon',
    templateUrl: './add-edit-coupon.component.html'
})
export class AddEditCouponComponent implements OnInit, OnChanges {
    settingList;
    randomcouponcode;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    userstoragedata = {} as any;
    @Input() customerObj = {} as any;
    @Input() couponObj = {} as any;
    couponForm: FormGroup;
    couponErrObj = AppMessages.VALIDATION.COUPON;
    saving = false;
    @Output() notifyCouponChange: EventEmitter<any> = new EventEmitter();
    buttonTxt = AppConstant.BUTTON_TXT.SAVE;
    formTitle = AppConstant.FORM_TITLE.COUPON.ADD;
    constructor(private bootstrapAlertService: BootstrapAlertService,
        private commonService: CommonService,
        private couponService: BusinessService.CouponService,
        private fb: FormBuilder,
        private settingService: SettingService,
        private localStorageService: LocalStorageService) {
    }
    ngOnInit() {
        this.initCouponForm();
        this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
        this.settingService.list({ 'settingkey': 'autogencouponyn', 'membershipid': this.customerObj.membershipid }).subscribe((res) => {
            const response = JSON.parse(res._body);
            if (response.status) {
                this.settingList = response.data;
                if (this.settingList[0].settingvalue === 'Y') {
                    this.randomcouponcode = Math.round(Math.random() * 1000000);
                    this.couponForm.controls['couponcode'].setValue(this.randomcouponcode);
                }
            }
        });
    }
    initCouponForm() {
        this.couponForm = this.fb.group({
            couponcode: [this.randomcouponcode, Validators.compose([Validators.required, Validators.maxLength(50)])],
            shortdesc: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            noofcoupons: [null, Validators.compose([Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')])],
            expirydt: [null, Validators.required],
            description: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(500)])],
            status: [true, Validators.required]
        });
    }
    ngOnChanges(changes: SimpleChanges) {
        if (!_.isUndefined(changes.couponObj) && !_.isEmpty(changes.couponObj.currentValue)) {
            this.buttonTxt = AppConstant.BUTTON_TXT.UPDATE;
            this.formTitle = AppConstant.FORM_TITLE.COUPON.UPDATE;
            this.couponObj = changes.couponObj.currentValue;
            this.editCoupon(this.couponObj);
        } else {
            this.initCouponForm();
            this.buttonTxt = AppConstant.BUTTON_TXT.SAVE;
            this.formTitle = AppConstant.FORM_TITLE.COUPON.ADD;
        }
    }
    close() {
        this.notifyCouponChange.emit({ close: true });
    }
    callParent(data) {
        this.notifyCouponChange.emit(data);
    }
    saveOrUpdateCoupon() {
        let errMessage: any;
        if (_.isEmpty(this.customerObj)) {
            this.bootstrapAlertService.showError(AppMessages.VALIDATION.BUSINESS.common);
            return false;
        } else {
            if (!this.couponForm.valid) {
                errMessage = this.commonService.getFormErrorMessage(this.couponForm, this.couponErrObj);
                this.bootstrapAlertService.showError(errMessage);
                return false;
            } else {
                const data = this.couponForm.value;
                const formdata = { ...data } as any;
                formdata.couponcode = data.couponcode.toString();
                formdata.membershipid = this.customerObj.membershipid;
                formdata.noofcoupons = Number(data.noofcoupons);
                data.expirydt = new Date(this.commonService.formatDate(data.expirydt));
                data.expirydt = data.expirydt.setHours( 23, 59, 59 );
                if (new Date(data.expirydt) < this.commonService.getCurrentDate()) {                    
                    this.bootstrapAlertService.showError(this.couponErrObj.expirydt.invalid);
                    return false;
                }
                formdata.expirydt = this.commonService.formatDate(data.expirydt);
                formdata.updatedby = this.userstoragedata.fullname;
                formdata.updateddt = new Date();
                if (!_.isUndefined(this.couponObj) && !_.isUndefined(this.couponObj.couponid) && !_.isEmpty(this.couponObj)) {
                    formdata.status = data.status;
                    this.couponService.update(formdata, this.couponObj.couponid).subscribe(res => {
                        const response = JSON.parse(res._body);
                        if (response.status) {
                            this.bootstrapAlertService.showSucccess(response.message);
                            this.initCouponForm();
                            this.callParent(response.data);
                        } else {
                            this.bootstrapAlertService.showError(response.message);
                        }
                    });
                } else {
                    formdata.status = AppConstant.STATUS_ACTIVE;
                    formdata.createdby = this.userstoragedata.fullname;
                    formdata.createddt = new Date();
                    this.couponService.create(formdata).subscribe((res) => {
                        const response = JSON.parse(res._body);
                        if (response.status) {
                            this.bootstrapAlertService.showSucccess(response.message);
                            this.initCouponForm();
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
    editCoupon(data) {
        this.couponObj = data;
        const expirydt = this.commonService.parseDate(new Date(this.couponObj.expirydt));
        this.couponForm.patchValue(this.couponObj);
        this.couponForm.controls['expirydt'].setValue(expirydt);
    }
}
