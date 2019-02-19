import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../../app-messages';
import { BaseService, BusinessService, CommonService } from '../../services';


@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html'
})
export class DealerComponent extends BaseService implements OnInit {
  dealerList = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  emptymessages = AppConstant.EMPTY_MESSAGES.DEALER;
  loadingIndicator: boolean = true;

  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  constructor(private router: Router,
    private commonService: CommonService,
    private dealerService: BusinessService.DealerService,
    private bootstrapAlertService: BootstrapAlertService) {
    super();
    this.getScreenDetails('b_dealers');
  }

  ngOnInit() {
    this.getDealersList();
  }
  getDealersList() {
    this.loadingIndicator = true;
    this.dealerService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.dealerList = response.data;
        this.tempFilter = this.dealerList;
      }
    });
  }

  addDealer() {
    this.router.navigate(['business/dealer/create']);
  }
  editDealer(id) {
    this.router.navigate(['business/dealer/edit/' + id]);
  }
  search(event?) {
    this.dealerList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }

  updateDealerStatus(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    this.dealerService.update(updateObj, data.dealerid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (flag) {
          this.bootstrapAlertService.showSucccess('#' + data.dealerid + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
          this.dealerList.splice(index, 1);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
          this.dealerList[index].status = response.data.status;
        }
        this.dealerList = [...this.dealerList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
}
