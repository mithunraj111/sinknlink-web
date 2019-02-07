import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { AdminService, BaseService } from '../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../../app-messages';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent extends BaseService implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  tempFilter = [];
  displaydtimeformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  displaydateformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  donationList = [];
  constructor(private router: Router,
    private donationService: AdminService.DonationService,
    private bootstrapAlertService: BootstrapAlertService) {
    super();
    this.getScreenDetails('a_donations');
  }

  ngOnInit() {
    this.getDonations();
  }
  getDonations() {
    this.donationService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
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
    this.donationService.update(updateObj, data.donationid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (flag) {
          this.bootstrapAlertService.showSucccess('#' + data.donationid + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
          this.donationList.splice(index, 1);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
          this.donationList[index].status = response.data.status;
        }
        this.donationList = [...this.donationList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }

  addDonation() {
    this.router.navigate(['admin/donation/create']);
  }
  editDonation(data) {
    this.router.navigate(['admin/donation/edit/' + data.donationid]);
  }
  search(event?) {
    let val = '';
    if (event != null && event != undefined) {
      val = event.target.value.toLowerCase();
    }
    const temp = this.tempFilter.filter(item => {
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.donationList = temp;
    this.table.offset = 0;
  }
}
