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
import { DealerService } from 'src/app/services/business';
import { AppCommonService } from 'src/app/services';

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
  cityList = [{ value: "", label: "All" }];
  tempFilter = [];
  dealerReportList = [];
  cityName: any;
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
  getDealerReport() {

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
    }

    console.log(formData)
    this.loadingIndicator = true;
    this.reportService.areawiseDealerCount(formData).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.dealerReportList = response.data;
      }
      this.loadingIndicator = false;
      this.tempFilter = this.dealerReportList;

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
        this.areaList = [{ value: "", label: "All" }];
        this.areaList = this.areaList.concat(response.data);
      }
    });
  }

}
