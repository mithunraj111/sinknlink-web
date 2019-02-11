import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { BusinessService, LocalStorageService, AdminService, AppCommonService, CommonService } from '../../../../services';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';
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
  @Input() customerObj = {} as any;
  selectedPaymentObj = {} as any;
  addPaymentForm: FormGroup;
  addPaymentErrObj = AppMessages.VALIDATION.PAYMENTS;
  paymentMethods = [];
  donationList = [];
  selectedDonation = {} as any;
  date = new Date();
  constructor(private paymentService: AppCommonService.PaymentsService,
    private lookupService: AdminService.LookupService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private donationService: AdminService.DonationService,
    private bootstrapAlertService: BootstrapAlertService) {
  }

  ngOnInit() {
    this.initPaymentForm();
    this.getLookUps();
    this.getDonations();
  }
  initPaymentForm() {
    this.addPaymentForm = this.fb.group({
      paymentdt: ['', Validators.required],
      totalamount: [null, Validators.required],
      paymentref: ['', Validators.required],
      paymentmode: ['', Validators.required],

      remarks: ['']
    });
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

  getDonations() {
    this.donationService.list({ status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.donationList = response.data;
      }
    });
  }
  search(event?) {
    this.payHistoryList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
  openModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeModal(event) {
    document.querySelector('#' + event).classList.remove('md-show');
  }
  viewpayment(row) {
    this.openModal('customerpaymentmodal');
    this.newPayment = false;
    this.viewPayment = true;
    this.noEdit = true;
    this.selectedPaymentObj = row;
    this.selectedPaymentObj.paymentdt = this.commonService.parseDate(this.selectedPaymentObj.paymentdate);
    this.addPaymentForm.patchValue(this.selectedPaymentObj);
  }
  addpayment() {
    this.openModal('customerpaymentmodal');
    this.newPayment = true;
    this.viewPayment = false;
    this.noEdit = false;
  }
  viewDonationCause(data) {
    this.selectedDonation = data;
    this.openModal('donationCauseModal');
  }
  getRowHeight(row) {
    return row.height;
  }
  getLookUps() {
    this.lookupService.list({ status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (response.data.length > 0) {
          response.data.map(item => {
            item.value = item.refvalue;
            item.label = item.refvalue;
          });
          let groupedData = _.groupBy(response.data, 'refkey');
          this.paymentMethods = _.get(groupedData, 'biz_paymentmethods');
        }
      }
    });
  }

  savePayment() {
    let errMsg: any;
    if (!this.addPaymentForm.valid) {
      errMsg = this.commonService.getFormErrorMessage(this.addPaymentForm, this.addPaymentErrObj);
      this.bootstrapAlertService.showError(errMsg);
      return false;
    }
    const formData = this.addPaymentForm.value;
    const data = {
      paymentdate: this.commonService.formatDate(formData.paymentdt),
      totalamount: Number(formData.totalamount),
      membershipid: this.customerObj.membershipid,
      paymentmode: formData.paymentmode,
      paymentref: formData.paymentref,
      paymenttype: AppConstant.PAYMENT_TYPES[1],
      paymentstatus: AppConstant.STATUS_SUCCESS
    };
    this.paymentService.create(data).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.payHistoryList = [response.data, ...this.payHistoryList];
        this.bootstrapAlertService.showSucccess(response.message);
        this.closeModal('customerpaymentmodal');
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
}
