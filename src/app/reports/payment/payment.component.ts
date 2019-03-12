import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';
import downloadService from '../../services/download.service';
import { AppCommonService, BaseService, CommonService, AdminService } from 'src/app/services';
import * as _ from 'lodash';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class PaymentComponent extends BaseService implements OnInit {
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
  loadingIndicator = false;
  userstoragedata = {} as any;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private bootstrapAlertService: BootstrapAlertService,
    private lookupService: AdminService.LookupService,
    private reportService: AppCommonService.ReportService) {
    super();
    this.getScreenDetails('r_dealer');
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
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.PAYMENTREPORT.fromdate.max);
      return false;
    }
    const formData = {
      fromdate: fromdt + ' 00:00',
      todate: todt + ' 23:59',
    } as any;
    if (paymentmode != '' && paymentmode != undefined && paymentmode != null) {
      formData.paymentmode = paymentmode;
    }
    if (paymenttype != '' && paymenttype != undefined && paymenttype != null) {
      formData.paymenttype = [paymenttype];
    }
    if (this.userstoragedata.roleid === 2) {
      formData.dealerid = this.dealerdata.dealerid;
    }
    if (this.userstoragedata.roleid === 3 && !_.isNull(this.userstoragedata.customer)) {
      formData.membershipid = this.userstoragedata.customer.membershipid;
    }

    let service;

    if (download) {
      this.generatingFile = false;
      service = this.reportService.paymentReport(formData, true);
    } else {
      this.loadingIndicator = true;
      service = this.reportService.paymentReport(formData);
    }

    service.subscribe(res => {
      if (download) {
        var buffer = Buffer.from(JSON.parse(res._body).file.data);
        downloadService(buffer, `PaymentReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
        this.generatingFile = false;
      } else {
        this.loadingIndicator = true;
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