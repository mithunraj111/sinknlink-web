import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { CommonService, AppCommonService, AdminService } from '../../../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AppMessages } from 'src/app/app-messages';

@Component({
  selector: 'app-dealer-payments',
  templateUrl: './payments.component.html'
})
export class DealerPaymentsComponent implements OnChanges, OnInit {
  dealerPayments = [];
  paymentDetail = {} as any;
  tempFilter = [];
  @Input() dealerid = {} as any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  emptymessages = AppConstant.EMPTY_MESSAGES.DEALER_PAYMENT;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  addPaymentForm: FormGroup;
  addPaymentErrObj = AppMessages.VALIDATION.PAYMENTS;
  paymentMethods = [] as any;
  constructor(private paymentService: AppCommonService.PaymentsService,
    private fb: FormBuilder, private lookupService: AdminService.LookupService,
    private commonService: CommonService, private bootstrapAlertService: BootstrapAlertService) {
  }

  ngOnInit() {
    this.initPaymentForm();
    this.getLookUps();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.dealerid = changes.dealerid.currentValue;
    this.getPayments(changes.dealerid.currentValue);
  }
  getPayments(dealerid) {
    if (dealerid != undefined) {
      this.paymentService.list({ dealerid: Number(dealerid) }).subscribe((res) => {
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
    this.lookupService.list({ status: AppConstant.STATUS_ACTIVE, refkey: 'biz_paymentmethods' })
      .subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          if (response.data.length > 0) {
            response.data.map(item => {
              item.value = item.refvalue;
              item.label = item.refvalue;
            });
            this.paymentMethods = response.data;
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
      amount: Number(formData.totalamount),
      taxes: 0,
      totalamount: Number(formData.totalamount),
      membershipid: 0,
      dealerid: Number(this.dealerid),
      paymentmode: formData.paymentmode,
      paymentref: formData.paymentref,
      paymenttype: AppConstant.PAYMENT_TYPES[1],
      paymentstatus: AppConstant.STATUS_SUCCESS
    };
    this.paymentService.create(data).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.dealerPayments = [response.data, ...this.dealerPayments];
        this.bootstrapAlertService.showSucccess(response.message);
        this.closeModal('dealerpaymentmodal');
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
}
