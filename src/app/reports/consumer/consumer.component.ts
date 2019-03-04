import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';
import { LookupService } from '../../services/admin';
import { LocationService } from 'src/app/services/masters';
import { ReportService } from 'src/app/services/common';
import * as _ from 'lodash';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class ConsumerComponent implements OnInit {
  consumerReportForm: FormGroup;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  displaydateformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  @ViewChild(DatatableComponent) consumertable: DatatableComponent;
  areaList = [];
  cityList = [];
  cityName: string;
  consumerList = [];
  generatingFile = false;
  tempFilter = [];
  emptymessages = AppConstant.EMPTY_MESSAGES.CONSUMER;
  loadingIndicator: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private locationService: LocationService,
    private commonService: CommonService,
    private reportService: ReportService,
    private bootstrapAlertService: BootstrapAlertService) { }
  ngOnInit() {
    this.initForm();
    this.getCity();
    this.getArea();
  }
  initForm() {
    this.consumerReportForm = this.fb.group({
      fromdate: [this.commonService.parseDate(new Date())],
      todate: [this.commonService.parseDate(new Date())],
      city: [''],
      area: ['']
    });
  }
  getConsumerReports() {
    const data = this.consumerReportForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    const city = data.city;
    let area = data.area;
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.AREACATEGORIES.fromdate.max);
      return false;
    }
    let formData = {
      fromdate: fromdt + ' 00:00',
      todate: todt + ' 23:59'
    } as any;
    if (area != "" && area != undefined && area != null) {
      formData.locationid = area;
    }
    if (city != "" && city != undefined && city != null) {
      formData.city = [city];
    }
    this.loadingIndicator = true;
    this.reportService.getConsumerCount(formData).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.consumerList = response.data;
      }
      this.loadingIndicator = false;
      this.tempFilter = this.consumerList;

    });
    this.getArea();
  }
  getCity() {
    this.lookupService.list({ refkey: 'biz_businesscity', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.refname;
          item.value = item.refvalue;
        });
        this.cityList = this.cityList.concat(response.data);
      }
    });
  }
  selectCity(option) {
    this.cityName = option.value;
    this.getArea();
  }
  getArea() {
    let condition = { status: AppConstant.STATUS_ACTIVE } as any;
    if (this.cityName != "") {
      condition.city = this.cityName;
    }
    this.locationService.list(condition).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.area + ' (' + item.pincode + ' )';
          item.value = item.locationid;
        });
        this.areaList = response.data;
      }
    });
  }
  search(event?) {
    this.consumerList = this.commonService.globalSearch(this.tempFilter, event);
    this.consumertable.offset = 0;
  }

  downloadReport() {
    this.generatingFile = true;
    const data = this.consumerReportForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    const city = data.city;
    let area = data.area;
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.AREACATEGORIES.fromdate.max);
      return false;
    }
    let formData = {
      fromdate: fromdt + ' 00:00',
      todate: todt + ' 23:59'
    } as any;
    if (area != "" && area != undefined && area != null) {
      formData.locationid = area;
    }
    if (city != "" && city != undefined && city != null) {
      formData.city = [city];
    }

    this.reportService.consumerReportDownload(formData).subscribe((res) => {
      var buffer = Buffer.from(JSON.parse(res._body).file.data);
      this.generatingFile = false;

      saveData(buffer, `ConsumerReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);

      function saveData(blob, name) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "none");
        blob = new Blob([blob], { type: "octet/stream" });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    })
  }
}
