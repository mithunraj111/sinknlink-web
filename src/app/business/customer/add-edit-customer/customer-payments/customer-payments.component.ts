import { Component, OnInit, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import * as _ from 'lodash';
import { BusinessService, LocalStorageService, AppCommonService, CommonService } from '../../../../services';
@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.component.html',
  styleUrls: ['./customer-payments.component.scss']
})
export class CustomerPaymentsComponent implements OnInit, OnChanges {
  payHistoryList = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  newPayment = true;
  viewPayment = true;
  noEdit = true;
  selectedPaymentObj = {} as any;
  constructor(private paymentService: AppCommonService.PaymentsService) {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getPaymentHistory(changes.customerObj.currentValue);
  }
  getPaymentHistory(customerObj) {
    if (!_.isEmpty(customerObj)) {
      this.paymentService.list({ membershipid: customerObj.membershipid }).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.payHistoryList = response.data;
          this.tempFilter = this.payHistoryList;
        }
      });
    }
  }
  search(event?) {
    let val = '';
    if (event != null && event != undefined) {
      val = event.target.value.toLowerCase();
    }
    const temp = this.tempFilter.filter(item => {
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.payHistoryList = temp;
    this.table.offset = 0;
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  viewpayment(row) {
    this.openMyModal('customerpaymentmodal');
    this.newPayment = false;
    this.viewPayment = true;
    this.noEdit = true;
    this.selectedPaymentObj = row;
  }
  addpayment() {
    this.openMyModal('customerpaymentmodal');
    this.newPayment = true;
    this.viewPayment = false;
    this.noEdit = false;
  }
  viewDonationCause() {
    this.openMyModal('donationCauseModal');
  }
  getRowHeight(row) {
    return row.height;
  }
}
