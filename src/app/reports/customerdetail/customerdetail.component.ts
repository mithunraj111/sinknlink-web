import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService, BaseService, MasterService, AdminService, AppCommonService } from 'src/app/services';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from 'src/app/shared/elements/dateParser';
import { AppMessages } from 'src/app/app-messages';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppConstant } from 'src/app/app.constants';
import { DatePipe } from '@angular/common';
import { Buffer } from 'buffer';
import downloadService from '../../services/download.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class CustomerdetailComponent extends BaseService implements OnInit {
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
  generatingFile = false;
  categoryLists = [];
  customerdetailForm: FormGroup;
  businessList = [];
  constructor(private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private reportService: AppCommonService.ReportService,
    private lookupService: AdminService.LookupService,
    private categoryService: MasterService.CategoryService,
    private locationService: MasterService.LocationService,
    private bootstrapAlertService: BootstrapAlertService) {
    super();
    this.getScreenDetails('r_customer');
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
      biztype: [''],
      area: [''],
      categoryid: [''],
      membershiptype: [''],
      city: ['']
    });
  }
  getReports(download?) {
    const data = this.customerdetailForm.value;
    data.city= this.cityName;
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
      fromdt: fromdt + ' 00:00',
      todate: todt + ' 23:59',
    } as any;

    if (categoryid != '' && categoryid != undefined && categoryid != null) {
      formData.categoryid = categoryid;
    }
    if (area != '') {
      formData.locationid = area;
    }
    if (biztype != '') {
      formData.biztype = biztype;
    }
    if (membershiptype != '') {
      formData.membershiptype = membershiptype;
    }
    if (city != '' && city != undefined && city != null) {
      formData.city = city;
    }
    if (this.userstoragedata.roleid === 2) {
      formData.dealerid = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.DEALER).dealerid;
    }
    let service;
    if (download) {
      this.generatingFile = true;
      service = this.reportService.customerDetailReport(formData, true);
    } else {
      this.loadingIndicator = true;
      service = this.reportService.customerDetailReport(formData);
    }
    service.subscribe((res) => {
      if (download) {
        var buffer = Buffer.from(JSON.parse(res._body).file.data);
        downloadService(buffer, `CustomerReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
        this.generatingFile = false;
      } else {
        this.loadingIndicator = true;
        const response = JSON.parse(res._body);
        if (response.status) {
          this.loadingIndicator = false;
          this.businessList = response.data;
        }
        this.loadingIndicator = false;
        this.tempFilter = this.businessList;
      }
    }, err => {
    });
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
    this.customerdetailForm.value.city = this.cityName;
    this.getArea();
  }
  onClear() {
    this.cityName = '' ;
    this.customerdetailForm.value.city = this.cityName;
    this.getArea();
  }
  getArea() {
    let condition = { status: AppConstant.STATUS_ACTIVE } as any;
    if (this.cityName != '') {
      condition.city = this.cityName;
    }
    this.locationService.list(condition).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.area + ' ( ' + (item.pincode || '-') + ' )';
          item.value = item.locationid;
        });
        this.areaList = response.data;
      }
    });
  }

  getCategory() {
    this.categoryService.list({}, '').subscribe(res => {
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
  
  viewBusiness(id){
    this.router.navigate(['business/customers/edit/' + id]);
  }

  search(event?) {
    this.businessList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
}