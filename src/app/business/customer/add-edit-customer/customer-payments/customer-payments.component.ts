import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { BusinessService, LocalStorageService, AdminService, AppCommonService, CommonService } from '../../../../services';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';
import { DatePipe } from '@angular/common';
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
  @Input() customerObj = {} as any;
  selectedPaymentObj = {} as any;
  addPaymentForm: FormGroup;
  addPaymentErrObj = AppMessages.VALIDATION.PAYMENTS;
  paymentMethods = [];
  paymentTenure = [];
  paymentarray: any ;
  userstoragedata = {} as any;
  donationList = [];
  selectedDonation = {} as any;
  totalamount = 0;
  nextdue: any;
  lastpaid: any;
  subscriptionAmt = 100;
  selfPayment = true;

  emptymessages = AppConstant.EMPTY_MESSAGES.PAYMENT;
  constructor(private paymentService: AppCommonService.PaymentsService,
    private lookupService: AdminService.LookupService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private donationService: AdminService.DonationService,
    private bootstrapAlertService: BootstrapAlertService,
    private localStorageService: LocalStorageService) {
    this.totalamount = this.subscriptionAmt;
    this.getDonations();
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.initPaymentForm();
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
    this.getLookUps();
  }
  getPaymentHistory(customerObj) {
    let selectedDate = [] as any;
    if (!_.isEmpty(customerObj)) {
      this.paymentService.list({ membershipid: customerObj.membershipid }).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.tempFilter = this.payHistoryList;
          this.payHistoryList = response.data;
        }
        let orderedDate = _.orderBy(this.payHistoryList, 'paymentdate', 'desc');
        selectedDate = _.find(orderedDate, function (obj: any) {
          if (obj.paymentstatus === 'Success') { return obj; }
        });
        this.lastpaid = selectedDate.paymentdate;
      });
    }
  }

  getDonations() {
    let today =  new DatePipe("en-US").transform(new Date(), "yyyy-MM-dd").toString();
    console.log(today);
    let condition = {
      status: AppConstant.STATUS_ACTIVE,
      startdate: today,
      enddate: today
    }
    this.donationService.list(condition).subscribe(res => {
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
    this.selectedPaymentObj = row;
    this.selectedPaymentObj.paymentdt = this.commonService.parseDate(this.selectedPaymentObj.paymentdate);
    this.addPaymentForm.patchValue(this.selectedPaymentObj);
  }
  addpayment() {
    this.initPaymentForm();
    this.openModal('customerpaymentmodal');
    this.newPayment = true;
    this.viewPayment = false;
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
          this.paymentTenure = _.get(groupedData, 'biz_paymenttenure');
        }
      }
      this.paymentarray = this.paymentTenure.find((item)=>item.refid == this.customerObj.paymenttenure)
      var date = new Date(this.lastpaid);
      this.nextdue = date.setDate(date.getDate() + Number(this.paymentarray.refvalue));
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
    this.save(data);
  }
  donationChecked() {
    let donationAmt = 0;
    _.map(this.donationList, function (item) {
      if (item.selected && item.selectedAmt) {
        donationAmt = donationAmt + Number(item.selectedAmt);
      }
    });
    this.totalamount = this.subscriptionAmt + donationAmt;
  }

  saveOnlinePayment() {
    const data = {
      paymentdate: new Date(),
      totalamount: this.totalamount,
      membershipid: this.customerObj.membershipid,
      paymentmode: 'NEFT',
      paymentref: '',
      paymenttype: AppConstant.PAYMENT_TYPES[0],
      paymentstatus: AppConstant.STATUS_SUCCESS
    };
    this.save(data);
  }

  save(data) {
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
