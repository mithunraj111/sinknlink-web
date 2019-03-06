import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';
import { LocationService } from 'src/app/services/masters';
import { LookupService } from 'src/app/services/admin';
import { AppCommonService } from 'src/app/services';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';
import downloadService from '../../services/download.service';
@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class DealerComponent implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  emptymesages = AppConstant.EMPTY_MESSAGES.DEALERREPORT;
  loadingIndicator: Boolean = false;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  dealerReportForm: FormGroup;
  fromdate;
  todate;
  // areaList = [{ value: "", label: "All" }];
  areaList = [];
  cityList = [];
  tempFilter = [];
  dealerReportList = [];
  cityName: any;
  generatingFile = false;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private bootstrapAlertService: BootstrapAlertService,
    private locationService: LocationService,
    private lookupService: LookupService,
    private reportService: AppCommonService.ReportService
  ) {
    this.initForm();
    this.getCities();
  }

  ngOnInit() {
  }
  search(event?) {
    this.dealerReportList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
  initForm() {
    this.dealerReportForm = this.fb.group({
      fromdate: [this.commonService.parseDate(new Date())],
      todate: [this.commonService.parseDate(new Date())],
      city: [''],
      area: ['']
    });

  }
  getDealerReport(download?) {

    const data = this.dealerReportForm.value;
    this.loadingIndicator = true;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    const city = data.city;
    this.generatingFile = false;
    let area = data.area;
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.DEALERREPORT.fromdate.max);
      return false;
    }
    let formData = {
      fromdate: fromdt + ' 00:00',
      todate: todt + ' 23:59'
    } as any;
    if (area != "") {
      formData.locationid = area;
    }
    if (city != "") {
      formData.city = [city];
    } let service;
    if (download) {
      service = this.reportService.areawiseDealerCount(formData, true);
    } else {
      service = this.reportService.areawiseDealerCount(formData);
    }
    service.subscribe((res) => {
      this.loadingIndicator = true;
      this.generatingFile = true;
      if (download) {
        var buffer = Buffer.from(JSON.parse(res._body).file.data);
        downloadService(buffer, `DealerReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
        this.loadingIndicator = false;
      } else {
        this.loadingIndicator = true;
          const response = JSON.parse(res._body);
          if (response.status) {
            this.loadingIndicator = false;
            this.dealerReportList = response.data;
          }
          this.loadingIndicator = false;
          this.tempFilter = this.dealerReportList;
      }
      this.generatingFile = false;
        });
      }
  getCities() {
    this.lookupService.list({ refKey: 'biz_businesscity', status: AppConstant.STATUS_ACTIVE }).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.refname;
          item.value = item.refvalue;
        })
        this.cityList = this.cityList.concat(response.data);
      }
    });
  }

  citySelect(option) {
    this.cityName = option.value;
    this.getArea();
  }
  getArea() {
    this.areaList = [];
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
        this.areaList = this.areaList.concat(response.data);
      }
    });
  }
}
