import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { LookupService } from 'src/app/services/admin';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import {
  map as LMap
} from 'lodash'
import { LocationService, CategoryService } from 'src/app/services/masters';
import { CommonService } from 'src/app/services';

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

  constructor(private commonService: CommonService, private lookupService: LookupService, private categoryService: CategoryService, private locationService: LocationService, private bootstrapAlertService: BootstrapAlertService) {
    this.tempFilter = this.businessList;
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
    filters['todt'] = this.commonService.formatDate(filters['todt']);

    console.log(filters); 
  }
  getRowHeight(row) {
    return row.height;
  }
  getLocation() {
    this.locationService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.locationLists = LMap(response.data, (o) => {
          return {
            label: o.area,
            value: o.locationid
          }
        });
        console.log(response.data);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  getCategory() {
    this.categoryService.list({}, "").subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.categoryLists = LMap(response.data, (o) => {
          return {
            label: o.categoryname,
            value: o.categoryid
          }
        });
        console.log(response.data);
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
        this.bizTypeLists = LMap(response.data.biz_businesstype, (o) => {
          return {
            label: o.refname,
            value: o.refvalue
          }
        });
        this.bizMemType = LMap(response.data.biz_membertype, (o) => {
          return {
            label: o.refname,
            value: o.refvalue
          }
        });
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
}
