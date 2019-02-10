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

@Component({
  selector: 'app-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.scss']
})
export class CustomerdetailComponent implements OnInit {
  public configOpenTopBar: any = 'open';
  @ViewChild(DatatableComponent) table: DatatableComponent;
  tempFilter = [];
  reportFilter = {};

  locationLists = [];
  bizTypeLists = [];
  bizMemType = [];
  categoryLists = [];

  constructor(private commonService: CommonService, private reportService: ReportService, private lookupService: LookupService, private categoryService: CategoryService, private locationService: LocationService, private bootstrapAlertService: BootstrapAlertService) {
    this.tempFilter = this.businessList;
    this.reportFilter = {
      fromdt: this.commonService.parseDate(new Date()),
      todt: this.commonService.parseDate(new Date()),
      biztype: '',
      locationid: '',
      categoryid: '',
      membershiptype: ''
    };
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
  getReports() {
    let filters = this.reportFilter;
    filters['fromdt'] = this.commonService.formatDate(filters['fromdt']);
    filters['todate'] = this.commonService.formatDate(filters['todate']);

    console.log(this.genFilters(filters));

    this.reportService.customerDetailReport(this.genFilters(filters)).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.businessList = response.data;
      }
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
        let lLists = [];
        lLists = LMap(response.data, (o) => {
          return {
            label: o.area,
            value: o.locationid
          }
        });
        lLists.push({
          label: 'All',
          value: 'All'
        });
        this.locationLists = lLists;
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  getCategory() {
    this.categoryService.list({}, "").subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        let cLists = []

        cLists = LMap(response.data, (o) => {
          return {
            label: o.categoryname,
            value: o.categoryid
          }
        });
        cLists.push({
          label: 'All',
          value: 'All'
        });
        this.categoryLists = cLists;
      } else {
        this.bootstrapAlertService.showError(response.message);
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
