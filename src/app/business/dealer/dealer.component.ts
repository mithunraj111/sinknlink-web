import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { LocalStorageService } from '../../services/local-storage.service';
import { DealerService } from '../../services/business/dealer.service';
import { AppMessages } from '../../app-messages';


@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html'
})
export class DealerComponent implements OnInit {

  dealerList = [];
  tempFilter = [];
  buttontext: string;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  userstoragedata = {} as any;
  constructor(private router: Router,
    private dealerService: DealerService,
    private bootstrapAlertService: BootstrapAlertService,
    private localStorageService: LocalStorageService) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);

  }

  ngOnInit() {
    this.getDealersList();
  }
  getDealersList() {
    this.dealerService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
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
    let val = '';
    if( event != null && event != undefined ){
      val = event.target.value.toLowerCase();
    }
    const temp = this.tempFilter.filter(item => {
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.dealerList = temp;
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
