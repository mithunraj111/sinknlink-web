import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { LookupService } from 'src/app/services/admin';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import {
  map as LMap
} from 'lodash'
import { LocationService, CategoryService } from 'src/app/services/masters';
import { CommonService } from 'src/app/services';
import { ReportService } from 'src/app/services/common';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from 'src/app/shared/elements/dateParser';
import { AppMessages } from 'src/app/app-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from 'src/app/app.constants';

@Component({
  selector: 'app-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class CustomerdetailComponent implements OnInit {
  public configOpenTopBar: any = 'open';
  @ViewChild(DatatableComponent) table: DatatableComponent;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  emptymessages = AppConstant.EMPTY_MESSAGES.CUSTOMERREPORT;
  loadingIndicator: Boolean = false;
  tempFilter = [];
  areaList = [];
  cityList = [];
  cityName: string;
  bizTypeLists = [];
  bizMemType = [];
  categoryLists = [];
  customerdetailForm: FormGroup;
  businessList = [];
  constructor(private fb: FormBuilder, private commonService: CommonService, private reportService: ReportService, private lookupService: LookupService, private categoryService: CategoryService, private locationService: LocationService, private bootstrapAlertService: BootstrapAlertService) {
    this.initForm();
  }

  ngOnInit() {
    this.getCity();
    this.getArea();
    this.getCategory();
    this.getLookup();
  }

  initForm() {
    this.customerdetailForm = this.fb.group({
      fromdt: [this.commonService.parseDate(new Date())],
      todate: [this.commonService.parseDate(new Date())],
      biztype: [""],
      area: [""],
      categoryid: [""],
      membershiptype: [""],
      city: ['']
    })
  }
  getReports() {
    const data = this.customerdetailForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdt);
    let area = data.area;
    let categoryid = data.categoryid;
    let biztype = data.biztype;
    let membershiptype = data.membershiptype;
    let city = data.city;
    if (new Date(fromdt) > new Date(todt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.DEALERREPORT.fromdate.max);
      return false;
    }
    let formData = {
      fromdt: fromdt,
      todate: todt,

    } as any;

    if (categoryid != "" && categoryid != undefined && categoryid != null) {
      formData.categoryid = categoryid;
    }
    if (area != "") {
      formData.area = area;
    }
    if (biztype != "") {
      formData.biztype = biztype;
    }
    if (membershiptype != "") {
      formData.membershiptype = membershiptype;
    }
    if (city != "" && city != undefined && city != null) {
      formData.city = [city];
    }
    this.loadingIndicator = true;
    this.reportService.customerDetailReport(formData).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.businessList = response.data;
      }
      this.loadingIndicator = false;
      this.tempFilter = this.businessList;

    }, err => {
    })
  }

  getRowHeight(row) {
    return row.height;
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
        this.areaList = this.areaList.concat(response.data);
      }
    });
  }

  getCategory() {
    this.categoryService.list({}, "").subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.categoryname;
          item.value = item.categoryid;
        });
        this.categoryLists = this.categoryLists.concat(response.data);
      }
    });
  }
  getLookup() {
    this.lookupService.list({ refkey: 'biz_membertype', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.refname;
          item.value = item.refvalue;
        });
        this.bizMemType = this.bizMemType.concat(response.data);
      }
    });
    this.lookupService.list({ refkey: 'biz_businesstype', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.refname;
          item.value = item.refvalue;
        });
        this.bizTypeLists = this.bizTypeLists.concat(response.data);
      }
    });
  }

  search(event?) {
    this.businessList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }

}
