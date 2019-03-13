import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService, CommonService, AdminService } from '../../services';
import { AppConstant } from '../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html'
})
export class AdvertisementComponent extends BaseService implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  emptymessages = AppConstant.EMPTY_MESSAGES.EVENTS;
  displaydtimeformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  displaydateformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  loadingIndicator = true;
  adList = [];
  tempFilter = [];

  constructor(private commonService: CommonService, private router: Router,
    private bootstrapAlertService: BootstrapAlertService, private adService: AdminService.AdvertisementService) {
    super();
    this.getScreenDetails('a_advertisement');
  }
  ngOnInit() {
    this.getAdvertisement();
  }

  getAdvertisement() {
    this.loadingIndicator = true;
    this.adService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.adList = response.data;
        this.tempFilter = this.adList;
      }
    });
  }

  addAd() {
    this.router.navigate(['admin/advertisement/create']);
  }
  editAdvertisement(id){
    this.router.navigate(['admin/advertisement/edit/' +id]);
  }
  updateAdvertisement(data, index, flag){
      const updateObj = {
        updateddt: new Date(),
        updatedby: this.userstoragedata.fullname,
        status: flag ? AppConstant.STATUS_DELETED :
          (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
      };
      if (flag) {
        this.adService.delete(updateObj, data.adid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess('#' + data.adid + ' ' + response.message);
            this.adList.splice(index, 1);
            this.adList = [...this.adList];
          } else {
            this.bootstrapAlertService.showError(response.message);
          }
        });
      } else {
        const formData = new FormData();
        formData.append('data', JSON.stringify(updateObj));
        this.adService.update(formData, data.adid).subscribe(res => {          
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.adList[index].status = response.data.status;
            this.adList = [...this.adList];
          } else {
            this.bootstrapAlertService.showError(response.message);
          }
        });
      }
  }
  search(event?) {
    this.adList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }


}
