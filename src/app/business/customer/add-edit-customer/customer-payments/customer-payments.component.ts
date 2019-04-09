import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { BusinessService, LocalStorageService, AdminService, AppCommonService, CommonService } from '../../../../services';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';
import { DatePipe } from '@angular/common';
import { RazarpayService } from '../../../../services/razorpay.service';
declare var Razorpay: any;
@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.component.html',
  styleUrls: ['./customer-payments.component.scss'],
  providers: [
    RazarpayService
  ],
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
  paymentarray: any;
  userstoragedata = {} as any;
  donationList = [];
  selectedDonation = {} as any;
  totalamount = 0;
  nextdue: any;
  lastpaid: any;
  subscriptionAmt;
  selfPayment = true;
  collectpayment = false;
  razarresponse: any;
  authentication: any;
  emptymessages = AppConstant.EMPTY_MESSAGES.PAYMENT;
  constructor(private paymentService: AppCommonService.PaymentsService,
    private lookupService: AdminService.LookupService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private donationService: AdminService.DonationService,
    private bootstrapAlertService: BootstrapAlertService,
    private localStorageService: LocalStorageService,
    private razarpayService: RazarpayService) {
    this.getDonations();
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.initPaymentForm();
  }
  initPaymentForm() {
    this.addPaymentForm = this.fb.group({
      paymentdt: [this.commonService.getCurrentDate('Y'), Validators.required],
      totalamount: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      paymentref: ['', Validators.required],
      paymentmode: ['', Validators.required],
      remarks: ['']
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getPaymentHistory(changes.customerObj.currentValue);
    this.getLookUps();
  }
  onlinePay() {
    this.razarpayService.loadrazarpay().then(() => {
      let self = this;
      const options = {
        key: this.authentication,
        amount: this.totalamount * 100,
        name: this.customerObj.bizname,
        currency: 'INR',
        description: 'Paid by online',
        handler: function (response) {
          if (response.razorpay_payment_id) {
            self.saveOnlinePayment(response.razorpay_payment_id);
          }
        }
      };
      let rasar = new Razorpay(options);
      rasar.open();
    });
  }
  getPaymentHistory(customerObj) {
    let selectedDate = [] as any;
    if (!_.isEmpty(customerObj)) {
      this.paymentService.list({ membershipid: customerObj.membershipid }).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.payHistoryList = response.data;
        }
        const orderedDate = _.orderBy(this.payHistoryList, 'paymentdate', 'desc');
        selectedDate = _.find(orderedDate, function (obj: any) {
          if (obj.paymentstatus === 'Success') { return obj; }
        });
        if (!_.isUndefined(selectedDate)) {
          this.lastpaid = selectedDate.paymentdate;
        }
        this.tempFilter = this.payHistoryList;
      });
    }
  }

  getDonations() {
    let today = new DatePipe("en-US").transform(new Date(), "yyyy-MM-dd").toString();
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
            if (item.refkey === 'biz_plan') {
              this.subscriptionAmt = item.refvalue;
              this.totalamount = this.subscriptionAmt;
            }
            if (item.refkey === 'biz_razar') {
              this.authentication = item.refvalue;
            }
          });
          const groupedData = _.groupBy(response.data, 'refkey');
          this.paymentMethods = _.get(groupedData, 'biz_paymentmethods');
          this.paymentTenure = _.get(groupedData, 'biz_paymenttenure');
        }
      }
      this.paymentarray = this.paymentTenure.find((item) => item.refid === Number(this.customerObj.paymenttenure));
      const date = new Date(this.lastpaid);
      if (!_.isUndefined(this.paymentarray)) {
        this.nextdue = date.setDate(date.getDate() + Number(this.paymentarray.refvalue));
      } else {
        this.nextdue = null;
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
    this.collectpayment = true;
    const data = {
      paymentdate: this.commonService.formatDate(formData.paymentdt),
      totalamount: Number(formData.totalamount),
      membershipid: this.customerObj.membershipid,
      paymentmode: formData.paymentmode,
      paymentref: formData.paymentref,
      paymenttype: AppConstant.PAYMENT_TYPES[1],
      paymentstatus: AppConstant.STATUS_SUCCESS,
      remarks: formData.remarks,
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname
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

  saveOnlinePayment(onlinepaymentid) {
    const data = {
      paymentref: onlinepaymentid,
      paymentdate: new Date(),
      amount: Number(this.totalamount),
      totalamount: Number(this.totalamount),
      membershipid: this.customerObj.membershipid,
      reference: 'Online#',
      paymentmode: 'Razarpay',
      remarks: 'Paid',
      paymenttype: AppConstant.PAYMENT_TYPES[0],
      paymentstatus: AppConstant.STATUS_SUCCESS,
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname
    };
    this.save(data);
  }

  save(data) {
    this.paymentService.create(data).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (data.paymenttype === AppConstant.PAYMENT_TYPES[1]) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.closeModal('customerpaymentmodal');
        }
        this.getPaymentHistory(this.customerObj);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
      this.collectpayment = false;
    });
  }

}
