import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { LookupService } from 'src/app/services/admin';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { map as LMap } from 'lodash';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { PaymentsService } from '../../services/common/payments.service';
import { ReportService } from '../../services/common';
import { AppMessages } from '../../app-messages';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';
import downloadService from '../../services/download.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class PaymentComponent implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  displaydateformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  emptymessages = AppConstant.EMPTY_MESSAGES.PAYMENTREPORT;
  paymentList = [];
  paymentTypes = [
    { label: 'Online', value: 'Online' },
    { label: 'Offline', value: 'Offline' }
  ];
  paymentModes = [];
  reportfiller = {};
  generatingFile = false;
  tempFilter = [];
  paymentForm: FormGroup;
  loadingIndicator: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private bootstrapAlertService: BootstrapAlertService,
    private paymentService: PaymentsService,
    private lookupService: LookupService,
    private reportService: ReportService) {
  }

  ngOnInit() {
    this.initForm();
    this.getPaymentModes();
  }

  initForm() {
    this.paymentForm = this.fb.group({
      fromdate: [this.commonService.parseDate(new Date())],
      todate: [this.commonService.parseDate(new Date())],
      paymenttype: [''],
      paymentmode: ['']
    });
  }

  getPaymentModes() {
    this.lookupService.list({ refkey: AppConstant.LOOKUP[3].value, status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.refname;
          item.value = item.refvalue;
        });
        this.paymentModes = response.data;
      }
    });
  }

  getPaymentList(download?) {
    const data = this.paymentForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    const paymenttype = data.paymenttype;
    const paymentmode = data.paymentmode;
    this.loadingIndicator = true;
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.PAYMENTREPORT.fromdate.max);
      return false;
    }
    let formData = {
      fromdate: fromdt + ' 00:00',
      todate: todt + ' 23:59',
    } as any;
    if (paymentmode != "" && paymentmode != undefined && paymentmode != null) {
      formData.paymentmode = paymentmode;
    }
    if (paymenttype != "" && paymenttype != undefined && paymenttype != null) {
      formData.paymenttype = [paymenttype];
    }
    this.loadingIndicator = true;

    let service;

    if (download) {
      service = this.reportService.paymentReport(formData, true);
    } else {
      service = this.reportService.paymentReport(formData);
    }

    service.subscribe(res => {
      if (download) {
        this.loadingIndicator = true;
        var buffer = Buffer.from(JSON.parse(res._body).file.data);
        this.generatingFile = false;
        downloadService(buffer, `PaymentReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
        this.loadingIndicator = false;
      } else {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.loadingIndicator = false;
          this.paymentList = response.data;
        }
        this.loadingIndicator = false;
        this.tempFilter = this.paymentList;
      }
    });
  }

  search(event?) {
    this.paymentList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
}