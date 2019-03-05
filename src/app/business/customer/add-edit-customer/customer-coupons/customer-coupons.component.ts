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
  emptymessages = AppConstant.EMPTY_MESSAGES.COUPONS;
  constructor(private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
    private couponService: BusinessService.CouponService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService) {
  }
  ngOnInit() {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
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
  updateCoupon(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    if (flag) {
      this.couponService.delete(updateObj, data.couponid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess('#' + data.couponid + ' ' + response.message);
          this.couponList.splice(index, 1);
          this.couponList = [...this.couponList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    } else {
      this.couponService.update(updateObj, data.couponid).subscribe(res => {
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

  notifyCouponChange(event) {
    if (!event.close) {
      this.getCouponList(this.customerObj);
      this.close();
    } else {
      this.close();
    }
  }
  addCoupon() {
    this.couponObj = {};
    this.open();
  }
  editCoupon(data) {
    this.couponObj = data;
    this.open();
  }
  close() {
    document.querySelector('#couponmodal').classList.remove('md-show');
  }
  open() {
    document.querySelector('#couponmodal').classList.add('md-show');
  }
}
