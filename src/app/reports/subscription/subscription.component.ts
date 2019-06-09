import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BaseService, MasterService, AdminService, CommonService, AppCommonService } from 'src/app/services';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { AppConstant } from 'src/app/app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import downloadService from '../../services/download.service';

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.scss'],
    providers: [
      { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
    ],
})
export class SubscriptionComponent extends BaseService implements OnInit {
    subscriptionForm: FormGroup;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    emptymessages = AppConstant.EMPTY_MESSAGES.SUBSCRIPTION_DUE;
    displaydateformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
    areaList = [];
    cityList = [];
    cityName: string;
    statusLists = [
        { label: 'Overdue', value: 'Overdue' },
        { label: 'Today', value: 'Today' },
        { label: 'Upcoming', value: 'Upcoming' }
    ];
    loadingIndicator: Boolean = false;
    generatingFile = false;
    subscriptionList = [];
    tempFilter = [];

    constructor(
        private fb: FormBuilder,
        private lookupService: AdminService.LookupService,
        private locationService: MasterService.LocationService,
        private commonService: CommonService,
        private router: Router,
        private reportService: AppCommonService.ReportService,
    ) {
        super();
        this.getScreenDetails('r_subscription');
    }

    ngOnInit() {
        this.initForm();
        this.getCityLists();
        this.getAreaLists();
    }
    initForm() {
        this.subscriptionForm = this.fb.group({
          city: [''],
          area: [''],
          status: ['']
        });
      }
      gotoBusiness(id){
        this.router.navigate(['business/customers/edit/' +id]);
      }
    getReports(download?) {
      const data = this.subscriptionForm.value;
      let area = data.area;
      let status = data.status;
      let city = data.city;
      let formData = {} as any;
      if (status != '' && status != undefined && status != null) {
        formData.status = status;
      }
      if (area != '' && area != undefined && area != null) {
        formData.locationid = area;
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
        service = this.reportService.subscriptionDueReport(formData, true);
      } else {
        this.loadingIndicator = true;
        service = this.reportService.subscriptionDueReport(formData);
      }
      service.subscribe((res) => {
        if (download) {
          var buffer = Buffer.from(JSON.parse(res._body).file.data);
          downloadService(buffer, `SubscriptiondueReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
          this.generatingFile = false;
        } else {
          this.loadingIndicator = true;
          const response = JSON.parse(res._body);
          if (response.status) {
            this.loadingIndicator = false;
            this.subscriptionList = response.data;
          }
          this.loadingIndicator = false;
          this.tempFilter = this.subscriptionList;
        }
      }, err => {
      });
    }
    getRowHeight(row) {
        return row.height;
    }
    getCityLists() {
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
    selectCity(selectedCity) {
        this.cityName = selectedCity.value;
        this.getAreaLists();
    }
    getAreaLists() {
        let condition = { status: AppConstant.STATUS_ACTIVE } as any;
        if (this.cityName != '') {
            condition.city = this.cityName;
        }
        this.locationService.list(condition).subscribe(res => {
            const response = JSON.parse(res._body);
            if (response.status) {
                response.data.map(item => {
                    item.label = item.area + ' (' + item.pincode + ' )';
                    item.value = item.locationid;
                });
                this.areaList = response.data;
            }
        });
    }
    search(event?) {
        this.subscriptionList = this.commonService.globalSearch(this.tempFilter, event);
        this.table.offset = 0;
    }
}
