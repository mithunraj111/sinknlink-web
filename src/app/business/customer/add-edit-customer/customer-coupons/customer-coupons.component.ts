import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, Input, Output } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { AppMessages } from 'src/app/app-messages';
import { BusinessService, LocalStorageService, CommonService } from '../../../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html',
  styleUrls: ['customer-coupons.component.scss']
})
export class CustomerCouponsComponent implements OnInit, OnChanges {
  couponList = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  userstoragedata = {} as any;
  @Input() customerObj = {} as any;
  @Output() couponObj = {} as any;
  couponForm: FormGroup;
  couponErrObj = AppMessages.VALIDATION.COUPON;
  emptymessages = AppConstant.EMPTY_MESSAGES.COUPONS;
  constructor(private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
    private couponService: BusinessService.CouponService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService) {
  }
  ngOnInit() {
    this.initCouponForm();
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }
  initCouponForm() {
    this.couponForm = this.fb.group({
      couponcode: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      shortdesc: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      noofcoupons: [null, Validators.compose([Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')])],
      expirydt: [null, Validators.required],
      description: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(500)])],
      status: [true, Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getCouponList(changes.customerObj.currentValue);
  }
  getCouponList(customerObj) {
    if (!_.isEmpty(customerObj)) {
      this.couponService.list({ membershipid: customerObj.membershipid }).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.couponList = response.data;
          this.tempFilter = this.couponList;
        }
      });
    }
  }
  search(event?) {
    this.couponList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
  changeCouponStatus(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    this.updateCoupon(updateObj, index, flag);
  }
  updateCoupon(data, index, flag) {

    if (flag) {
      this.couponService.delete(data, this.couponObj.couponid).subscribe(res => {
        console.log(this.couponObj.couponid)
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess('#' + this.couponObj.couponid + ' ' + response.message);
          this.couponList.splice(index, 1);
          this.couponList = [...this.couponList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }
    else {
      this.couponService.update(data, this.couponObj.couponid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.couponList[index].status = response.data.status;
          this.couponList = [...this.couponList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }
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
        formdata.membershipid = this.customerObj.membershipid;
        formdata.noofcoupons = Number(data.noofcoupons);
        formdata.expirydt = this.commonService.formatDate(data.expirydt);
        formdata.updatedby = this.userstoragedata.fullname;
        formdata.updateddt = new Date();
        if (!_.isUndefined(this.couponObj) && !_.isUndefined(this.couponObj.couponid) && !_.isEmpty(this.couponObj)) {
          formdata.status = data.status;
          const index = _.indexOf(this.couponList, this.couponObj);
          this.updateCoupon(formdata, index, false);
        } else {
          formdata.status = AppConstant.STATUS_ACTIVE;
          formdata.createdby = this.userstoragedata.fullname;
          formdata.createddt = new Date();
          this.couponService.create(formdata).subscribe((res) => {
            const response = JSON.parse(res._body);
            if (response.status) {
              this.bootstrapAlertService.showSucccess(response.message);
              this.couponList = [response.data, ...this.couponList];
              this.initCouponForm();
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
    this.couponObj.expirydt = this.commonService.parseDate(new Date(this.couponObj.expirydt));
    this.couponForm.patchValue(this.couponObj);
  }
}
