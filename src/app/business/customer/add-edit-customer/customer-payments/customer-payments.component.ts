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
  subscriptionPlan;
  noDonation = true;
  preferredAmountList = [] as any;
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
  preferredAmount;
  nextdue: any;
  lastpaid: any;
  subscriptionAmt;
  collectpayment = false;
  razarresponse: any;
  authentication: any;
  selectedplanamt = 0;
  donationAmt = 0;
  emptymessages = AppConstant.EMPTY_MESSAGES.PAYMENT;
  loadingIndicator: boolean = true;

  constructor(private paymentService: AppCommonService.PaymentsService,
    private lookupService: AdminService.LookupService,
    private customerService: BusinessService.CustomerService,
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
    this.getLookUps();
  }
  initPaymentForm() {
    this.addPaymentForm = this.fb.group({
      paymentdt: [this.commonService.getCurrentDate('Y'), Validators.required],
      amount: [0],
      donation: [0],
      totalamount: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      paymentref: ['', Validators.required],
      paymentmode: ['', Validators.required],
      remarks: ['', Validators.maxLength(100)]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.customerObj = changes.customerObj.currentValue;
    this.customerObj.paymenttenureid = this.customerObj.paymenttenureid;
    this.getPaymentHistory(changes.customerObj.currentValue);
  }
  getSubscriptionamount() {
    this.selectedplanamt = 0;
    this.selectedplanamt = this.subscriptionPlan;
    this.totalamount = Number(this.selectedplanamt);
    if (this.donationList[0].selected == true) {
      this.totalamount = Number(this.selectedplanamt) + Number(this.donationList[0].selectedAmt);
    }
  }
  onlinePay() {
    if (this.donationList[0].selectedAmt < 0) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.PAYMENTS.donationamount.minimum);
      return false;
    }
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
        },
        modal: {
          ondismiss: function () {
            self.saveOnlinePayment('');
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
    };
    const limit = 1;
    const offset = 0;
    this.donationService.list(condition, offset, limit).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.donationList = response.data;
        this.donationList[0].selected = true;
        this.preferredAmount = JSON.parse(this.donationList[0].amount);
        this.donationChecked();
        for (let i = 0; i < this.preferredAmount.length; i++) {
          this.preferredAmountList[i] = { label: this.preferredAmount[i], value: this.preferredAmount[i] }
        }
        this.donationList[0].selectedAmt = this.preferredAmount[0];
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
    this.newPayment = false;
    this.viewPayment = true;
    this.selectedPaymentObj = row;
    this.selectedPaymentObj.paymentdt = this.commonService.parseDate(this.selectedPaymentObj.paymentdate);
    this.addPaymentForm.patchValue(this.selectedPaymentObj);
    this.openModal('customerpaymentmodal');
  }
  addpayment() {
    this.initPaymentForm();
    this.newPayment = true;
    this.viewPayment = false;
    // this.addPaymentForm.controls["paymentmode"].enable(); 
    this.openModal('customerpaymentmodal');
  }
  viewDonationCause(data) {
    this.selectedDonation = data;
    this.openModal('donationCauseModal');
  }
  getRowHeight(row) {
    return row.height;
  }
  getLookUps() {
    this.loadingIndicator = true;
    this.lookupService.list({ status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (response.data.length > 0) {
          response.data.map(item => {
            item.value = item.refvalue;
            item.label = item.refname;
            if (item.refkey === 'biz_razar' && item.refname === 'Authentication key') {
              this.authentication = item.refvalue;
            }
          });
          const groupedData = _.groupBy(response.data, 'refkey');
          this.paymentMethods = _.get(groupedData, 'biz_paymentmethods');
          this.paymentTenure = _.get(groupedData, 'biz_paymenttenure');
        }
      }
      let self = this;
      // console.log(this.paymentObj);
      // console.log(self.customerObj);
      console.log(self.customerObj);
      self.paymentarray = _.find(self.paymentTenure, function (item: any) {
        console.log(item.refid);
        console.log(self.customerObj.paymenttenureid);
        if (item.refid == self.customerObj.paymenttenureid) {
          return item;
        }
      });
      
      // console.log(self.paymentarray);
      const date = new Date(this.lastpaid);
      this.subscriptionPlan = self.paymentarray == undefined ? 0 : self.paymentarray.refvalue;
      console.log(this.subscriptionPlan);
      this.selectedplanamt = this.subscriptionPlan;
      this.totalamount = Number(this.subscriptionPlan);
      if (this.preferredAmount.length > 0) {
        this.totalamount = Number(this.subscriptionPlan) + Number(this.donationList[0].selectedAmt);
      }
    });
    this.loadingIndicator = false;
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
    this.donationAmt = 0;
    let self = this;
    _.map(self.donationList, function (item) {
      if (item.selected && item.selectedAmt) {
        self.donationAmt = Number(self.donationAmt) + Number(item.selectedAmt);
      }
    });
    this.totalamount = Number(this.selectedplanamt) + Number(this.donationAmt);
  }

  saveOnlinePayment(onlinepaymentid) {
    const data = {
      paymentdate: new Date(),
      amount: Number(this.subscriptionPlan),
      totalamount: Number(this.totalamount),
      membershipid: this.customerObj.membershipid,
      reference: 'Online#',
      paymentmode: 'Razorpay',
      paymenttype: AppConstant.PAYMENT_TYPES[0],
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname
    } as any;
    if (this.donationList[0].selected == true) {
      data.donation = Number(this.donationList[0].selectedAmt),
        data.donationid = this.donationList[0].donationid
    }
    if (onlinepaymentid !== '') {
      data.paymentref = onlinepaymentid;
      data.paymentstatus = AppConstant.STATUS_SUCCESS;
      this.customerObj.nextdue = new Date(new Date().setDate(new Date(this.customerObj.nextdue).getDate() + data.amount)).toISOString();
      let customerData = {} as any;
      customerData.nextdue = this.customerObj.nextdue;
      this.customerService.update(customerData, this.customerObj.membershipid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.customerObj = response.data;
        } else {
        }
      }, err => {
      });
    } else {
      data.paymentref = 'Payment cancelled';
      data.remarks = 'Payment cancelled';
      data.paymentstatus = AppConstant.STATUS_FAILED;
    }
    this.save(data);
  }

  save(data) {
    this.paymentService.create(data).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (data.paymenttype === AppConstant.PAYMENT_TYPES[1]) {
          this.closeModal('customerpaymentmodal');
        }
        this.bootstrapAlertService.showSucccess(response.message);
        this.payHistoryList.unshift(response.data);
        this.payHistoryList = [...this.payHistoryList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
      this.collectpayment = false;
    });
  }
}
