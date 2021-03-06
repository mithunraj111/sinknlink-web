import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { AdminService, BaseService, CommonService } from '../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../../app-messages';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DonationsComponent extends BaseService implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  tempFilter = [];
  displaydtimeformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  displaydateformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  donationList = [];
  emptymessages = AppConstant.EMPTY_MESSAGES.DONATIONS;
  loadingIndicator: boolean = true;

  constructor(private router: Router,
    private donationService: AdminService.DonationService,
    private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService) {
    super();
    this.getScreenDetails('a_donations');
  }

  ngOnInit() {
    this.getDonations();
  }
  getDonations() {
    this.loadingIndicator = true;
    let service;
    if (this.userstoragedata.roleid == 3 ) {
      let today = new DatePipe("en-US").transform(new Date(), "yyyy-MM-dd").toString();
      let condition = {
        status: AppConstant.STATUS_ACTIVE,
        startdate: today,
        enddate: today
      };
      const limit = 1;
      const offset = 0;
      service = this.donationService.list(condition, offset, limit);
    } else {
      service = this.donationService.list({});
    }
    service.subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.donationList = response.data;
        this.tempFilter = this.donationList;
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  updateDonationStatus(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    if (flag) {
      this.donationService.delete(updateObj, data.donationid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess('#' + data.donationid + ' ' + response.message);
          this.donationList.splice(index, 1);
          this.donationList = [...this.donationList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    } else {
      this.donationService.update(updateObj, data.donationid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.donationList[index].status = response.data.status;
          this.donationList = [...this.donationList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }
  }

  addDonation() {
    this.router.navigate(['admin/donation/create']);
  }
  editDonation(data) {
    this.router.navigate(['admin/donation/edit/' + data.donationid]);
  }
  search(event?) {
    this.donationList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
}
