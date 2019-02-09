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
  @ViewChild(DatatableComponent) table: DatatableComponent;
  areaList = [{ value: "", label: "All" }];
  cityList = [{ value: "", label: "All" }];
  cityName: string;
  consumerList = [];
  tempFilter = [];
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
    const area = data.area;
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.AREACATEGORIES.fromdate.max);
      return false;
    }
    const formData = {
      fromdate: fromdt,
      todate: todt,
      locationid: area
    };
    this.reportService.getConsumerCount(formData).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.consumerList = response.data;
      }
    });
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
    console.log(option.value);
    console.log(this.cityName);
  }
  getArea() {
    this.areaList = [];
    let condition = { status: AppConstant.STATUS_ACTIVE } as any;
    if (this.cityName != "") {
      condition.city = this.cityName;
    }
    console.log(condition);
    this.locationService.list(condition).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.area + ' (' + item.pincode + ' )';
          item.value = item.locationid;
        });
        this.areaList = [{ value: "", label: "All" }];
        this.areaList = this.areaList.concat(response.data);
      }
    });
  }
  search(event?) {
    this.consumerList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }

}
