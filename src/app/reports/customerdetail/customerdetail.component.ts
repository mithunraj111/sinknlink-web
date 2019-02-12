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
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { AppConstant } from 'src/app/app.constants';
import { isNgTemplate } from '@angular/compiler';

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

  tempFilter = [];

  locationLists = [{ value: "", label: "All" }];
  bizTypeLists = [];
  // bizMemType = [{ value: "", label: "All" }];
  categoryLists = [{ value: "", label: "All" }];
  bizMemType = [];
  customerdetailForm: FormGroup;

  constructor(private fb: FormBuilder, private commonService: CommonService, private reportService: ReportService, private lookupService: LookupService, private categoryService: CategoryService, private locationService: LocationService, private bootstrapAlertService: BootstrapAlertService) {
    this.initForm();

  }
  businessList = [

  ];
  ngOnInit() {
    this.getLookUps();
    this.getLocation();
    this.getCategory();
  }
  toggleTopbar() {
    this.configOpenTopBar = this.configOpenTopBar === 'open' ? '' : 'open';
  }

  initForm() {
    this.customerdetailForm = this.fb.group({
      fromdt: [this.commonService.parseDate(new Date())],
      todate: [this.commonService.parseDate(new Date())],
      biztype: [''],
      locationid: [''],
      categoryid: [''],
      membershiptype: ['']
    })
  }
  getReports() {
    const data = this.customerdetailForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdt);
    let locationid = data.locationid;
    let categoryid = data.categoryid;
    let biztype = data.biztype;
    let membershiptype = data.membershiptype;
    if (new Date(fromdt) > new Date(todt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.DEALERREPORT.fromdate.max);
      return false;
    }
    let formData = {
      fromdt: fromdt,
      todate: todt,
      biztype: biztype,
      membershiptype: membershiptype
    } as any;

    if (categoryid != "") {
      formData.categoryid = categoryid;
    }
    if (locationid != "") {
      formData.locationid = locationid;
    }

    this.reportService.customerDetailReport(formData).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.businessList = response.data;
      }
      this.tempFilter = this.businessList;

      console.log(this.businessList)
    }, err => {

    })

  }
  getRowHeight(row) {
    return row.height;
  }
  getLocation() {
    this.locationService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.area + ' (' + item.pincode + ' )';
          item.value = item.locationid;
        });
        this.locationLists = [{ value: "", label: "All" }];
        this.locationLists = this.locationLists.concat(response.data);
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
        this.categoryLists = [{ value: "", label: "All" }];
        this.categoryLists = this.categoryLists.concat(response.data);
      }
    });
  }
  getLookUps() {
    this.lookupService.list({
      "refkey": "biz_businesstype,biz_membertype"
    }, true).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        let bTypeLists = [];
        let bMemType = [];
        bTypeLists = LMap(response.data.biz_businesstype, (o) => {
          return {
            label: o.refname,
            value: o.refvalue
          }
        });
        bTypeLists.push({
          label: 'All',
          value: 'All'
        })
        this.bizTypeLists = bTypeLists;
        bMemType = LMap(response.data.biz_membertype, (o) => {
          return {
            label: o.refname,
            value: o.refvalue
          }
        });
        bMemType.push({
          label: 'All',
          value: 'All'
        })
        this.bizMemType = bMemType;
        console.log(response.data);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  // getBusiness() {
  //   this.lookupService.list({ refKey: 'biz_businesstype' }).subscribe((res) => {
  //     const response = JSON.parse(res._body);
  //     if (response.status) {
  //       response.data.map(item => {
  //         item.label = item.refname;
  //         item.value = item.refvalue;
  //       })
  //       this.bizTypeLists = [{ value: "", label: "All" }];
  //       this.bizTypeLists = this.bizTypeLists.concat(response.data);
  //     }
  //   });
  // }

  search(event?) {
    this.businessList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
  genFilters(data) {
    let filters = {};
    for (const key in data) {
      if (data[key] == 'All' || data[key] == '') {

      } else {
        filters[key] = data[key];
      }
    }
    return filters;
  }
}
