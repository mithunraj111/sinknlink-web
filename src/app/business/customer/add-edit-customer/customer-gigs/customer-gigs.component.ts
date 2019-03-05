import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, Output } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { BusinessService, LocalStorageService, CommonService } from '../../../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import * as _ from 'lodash';
@Component({
  selector: 'app-customer-gigs',
  templateUrl: './customer-gigs.component.html',
  styleUrls: ['customer-gigs.component.scss']
})
export class CustomerGigsComponent implements OnInit, OnChanges {
  gigsList = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  userstoragedata = {} as any;
  @Input() customerObj = {} as any;
  @Output() gigObj = {} as any;
  emptymessages = AppConstant.EMPTY_MESSAGES.GIGS;
  constructor(private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
    private gigsService: BusinessService.GigsService,
    private localStorageService: LocalStorageService) {
  }
  ngOnInit() {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getgigsList(changes.customerObj.currentValue);
  }
  getgigsList(customerObj) {
    if (!_.isEmpty(customerObj)) {
      this.gigsService.list({ membershipid: customerObj.membershipid }).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.gigsList = response.data;
          this.tempFilter = this.gigsList;
        }
      });
    }
  }
  search(event?) {
    this.gigsList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
  updateGig(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    if (flag) {
      this.gigsService.delete(updateObj, data.gigid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess('#' + data.gigid + ' ' + response.message);
          this.gigsList.splice(index, 1);
          this.gigsList = [...this.gigsList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    } else {
      this.gigsService.update(updateObj, data.gigid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.gigsList[index].status = response.data.status;
          this.gigsList = [...this.gigsList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }
  }
  addgig() {
    this.gigObj = {};
    this.open();
  }
  editgig(data) {
    this.gigObj = data;
    this.open();
  }
  close() {
    document.querySelector('#gigmodal').classList.remove('md-show');
  }
  open() {
    document.querySelector('#gigmodal').classList.add('md-show');
  }
  notifyGigEntry(event) {
    if (!event.close) {
      this.getgigsList(this.customerObj);
      this.close();
    } else {
      this.close();
    }
  }
}
