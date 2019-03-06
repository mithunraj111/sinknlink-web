import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { CommonService, AppCommonService, AdminService, BusinessService } from '../../../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AppMessages } from 'src/app/app-messages';
import * as _ from 'lodash';
@Component({
  selector: 'app-dealer-payments',
  templateUrl: './payments.component.html'
})
export class DealerPaymentsComponent implements OnChanges, OnInit {
  dealerPayments = [];
  paymentDetail = {} as any;
  tempFilter = [];
  dealerid: number;
  @Input() dealerObj = {} as any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  emptymessages = AppConstant.EMPTY_MESSAGES.DEALER_PAYMENT;
  @Output() notifyPayment: EventEmitter<any> = new EventEmitter();
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  addPaymentForm: FormGroup;
  addPaymentErrObj = AppMessages.VALIDATION.PAYMENTS;
  paymentMethods = [] as any;
  dealerCustomersids = [] as any;
  commissionAmt = 0;
  constructor(private paymentService: AppCommonService.PaymentsService,
    private fb: FormBuilder,
    private lookupService: AdminService.LookupService,
    private commonService: CommonService,
    private customerService: BusinessService.CustomerService,
    private dealerService: BusinessService.DealerService,
    private bootstrapAlertService: BootstrapAlertService) {
  }

  ngOnInit() {
    this.initPaymentForm();
    this.getLookUps();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getPayments(changes.dealerObj.currentValue);
    this.getCustomers(changes.dealerObj.currentValue);
    this.dealerid = changes.dealerObj.currentValue.dealerid;
  }
  getPayments(dealerObj) {
    if (dealerObj != undefined) {
      this.paymentService.list({ dealerid: Number(dealerObj.dealerid) }).subscribe((res) => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.dealerPayments = response.data;
          this.tempFilter = this.dealerPayments;
        }
      });
    }
  }
  viewPayment(data) {
    this.paymentDetail = data;
    this.openModal('paymentDetailModal');
  }
  search(event?) {
    this.dealerPayments = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
  getLookUps() {
    this.lookupService.list({ status: AppConstant.STATUS_ACTIVE, refkey: 'biz_paymentmethods,biz_dealeramount' }, true)
      .subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          const pymtMethods = _.get(response.data, 'biz_paymentmethods');
          if (pymtMethods.length > 0) {
            pymtMethods.map(item => {
              item.value = item.refvalue;
              item.label = item.refname;
            });
            this.paymentMethods = pymtMethods;
          }
          this.commissionAmt = _.get(response.data, 'biz_dealeramount')[0].refvalue;
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
      amount: Number(formData.totalamount),
      taxes: 0,
      totalamount: Number(formData.totalamount),
      dealerid: Number(this.dealerid),
      paymentmode: formData.paymentmode,
      paymentref: formData.paymentref,
      paymenttype: AppConstant.PAYMENT_TYPES[1],
      paymentstatus: AppConstant.STATUS_SUCCESS,
      remarks: formData.remarks
    };
    this.paymentService.create(data).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.dealerPayments = [response.data, ...this.dealerPayments];
        this.bootstrapAlertService.showSucccess(response.message);
        this.closeModal('dealerpaymentmodal');
        this.dealerService.update({ lastcommissionpaiddt: new Date() }, this.dealerid).subscribe(result => {
          const updateRes = JSON.parse(result._body);
          if (updateRes.status) {
            this.notifyPayment.emit(updateRes.data);
          }
        });
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  openModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeModal(event) {
    document.querySelector('#' + event).classList.remove('md-show');
  }
  addpayment() {
    this.openModal('dealerpaymentmodal');
    console.log(this.commissionAmt, this.dealerCustomersids.length)
    this.addPaymentForm.controls['totalamount'].setValue(this.commissionAmt * this.dealerCustomersids.length);

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

  getCustomers(dealerObj) {
    if (!_.isUndefined(dealerObj.dealerid)) {
      const condition = {
        dealerid: Number(dealerObj.dealerid),
      } as any;
      if (!_.isNull(dealerObj.lastcommissionpaiddt)) {
        condition.commisiondate = dealerObj.lastcommissionpaiddt;
      }
      this.customerService.list(condition).subscribe((res) => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.dealerCustomersids = _.map(response.data, _.property('membershipid'));
        }
      });
    }
  }
}
