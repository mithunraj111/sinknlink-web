import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService, MasterService, BaseService, AdminService, AppCommonService } from '../../services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';
import downloadService from '../../services/download.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class DealerComponent extends BaseService implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  emptymesages = AppConstant.EMPTY_MESSAGES.DEALERREPORT;
  loadingIndicator = false;

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
    private locationService: MasterService.LocationService,
    private lookupService: AdminService.LookupService,
    private router: Router,
    private reportService: AppCommonService.ReportService
  ) {
    super();
    this.getScreenDetails('r_dealer');
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
  gotoDealer(id) {
    this.router.navigate(['business/dealer/edit/' +id]);
  }
  getDealerReport(download?) {

    const data = this.dealerReportForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    const city = data.city;
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
      this.generatingFile = false;
      service = this.reportService.areawiseDealerCount(formData, true);
    } else {
      this.loadingIndicator = true;
      service = this.reportService.areawiseDealerCount(formData);
    }
    service.subscribe((res) => {
      if (download) {
        var buffer = Buffer.from(JSON.parse(res._body).file.data);
        downloadService(buffer, `DealerReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
        this.generatingFile = false;
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
