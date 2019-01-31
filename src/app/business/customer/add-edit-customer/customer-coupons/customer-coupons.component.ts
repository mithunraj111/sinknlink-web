import { Component, OnInit, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { AppMessages } from 'src/app/app-messages';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CouponService } from 'src/app/services/business/coupon.service';

@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html'
})
export class CustomerCouponsComponent implements OnInit, OnChanges {
  couponList = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  userstoragedata = {} as any;
  constructor(private couponService: CouponService,
    private localStorageService: LocalStorageService,
    private bootstrapAlertService: BootstrapAlertService) {
  }
  ngOnInit() {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getCouponList(changes.customerid.currentValue);
  }
  getCouponList(customerid) {
    if (customerid) {
      this.couponService.list({ membershipid: customerid }).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.couponList = response.data;
          this.tempFilter = this.couponList;
        }
      });
    }
  }
  search(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempFilter.filter(item => {
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.couponList = temp;
    this.table.offset = 0;
  }
  updateCouponStatus(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    this.couponService.update(updateObj, data.couponid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (flag) {
          this.bootstrapAlertService.showSucccess('#' + data.couponid + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
          this.couponList.splice(index, 1);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
          this.couponList[index] = response.data;
        }
        this.couponList = [...this.couponList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
}
