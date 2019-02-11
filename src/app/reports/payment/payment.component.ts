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
  @ViewChild(DatatableComponent) table: DatatableComponent;

  paymentList = [];
  paymentTypes = [];
  reportfiller = {};
  tempFilter = [];
  paymentForm: FormGroup;

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
    this.getLookUps();
  }
  search(event?) {
    this.paymentList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
  initForm() {
    this.paymentForm = this.fb.group({
      fromdate: [this.commonService.parseDate(new Date())],
      todate: [this.commonService.parseDate(new Date())],
      paymenttype: ''
    });
  }

  getPayment() {
    const data = this.paymentForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    const paymenttype = data.paymenttype;
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.PAYMENTREPORT.fromdate.max);
      return false;
    }
    let formData = {
      fromdate: fromdt,
      todate: todt
    } as any;
    if (paymenttype != "") {
      formData.paymenttype = paymenttype;
    }

    this.reportService.paymentReport({formData}).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.paymentList = response.data;
        console.log(this.paymentList);
      }
    });
  }

  getLookUps() {
    this.lookupService.list({ refkey: AppConstant.LOOKUP[3].value }, true).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        let bTypeLists = [];
        bTypeLists = LMap(response.data.biz_paymentmethods, (o) => {
          return {
            label: o.refname,
            value: o.refvalue
          };
        });
        bTypeLists.push({
          label: 'All',
          value: 'All'
        });
        this.paymentTypes = bTypeLists;
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }

}
