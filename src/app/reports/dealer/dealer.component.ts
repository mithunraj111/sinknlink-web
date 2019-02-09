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
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  dealerReportForm: FormGroup;
  fromdate;
  todate;
  areaList = [{ value: "", label: "All" }];
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
    this.tempFilter = this.dealerReportList;
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
    const area = data.area;
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.DEALERREPORT.fromdate.max);
      return false;
    }
    const formData = {
      fromdate: fromdt,
      todate: todt,
      locationid: area

    };
    console.log(formData)
    this.reportService.areawiseDealerCount(formData).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.dealerReportList = response.data;
      }
      console.log(this.dealerReportList)
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
    console.log(this.cityName)
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
