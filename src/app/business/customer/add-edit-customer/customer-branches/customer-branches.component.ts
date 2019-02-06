import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AppConstant } from '../../../../app.constants';
import { BusinessService, BaseService } from '../../../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';

@Component({
  selector: 'app-customer-branches',
  templateUrl: './customer-branches.component.html'
})
export class CustomerBranchesComponent extends BaseService implements OnInit, OnChanges {
  branchesList = [];
  tempFilter = [];
  @Input() customerObj = {} as any;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  constructor(private customerService: BusinessService.CustomerService,
    private bootstrapAlertService: BootstrapAlertService) {
    super();
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getBranchesList(changes.customerObj.currentValue);
  }
  getBranchesList(customerObj) {
    if (customerObj.membershipid) {
      this.customerService.list({ parentmembershipid: customerObj.membershipid }).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.branchesList = response.data;
          this.tempFilter = this.branchesList;
        }
      });
    }
  }
  updateBranchStatus(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    this.customerService.update(updateObj, data.membershipid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (flag) {
          this.bootstrapAlertService.showSucccess('#' + data.membershipid + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
          this.branchesList.splice(index, 1);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
          this.branchesList[index] = response.data;
        }
        this.branchesList = [...this.branchesList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
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
    this.branchesList = temp;
    // this.table.offset = 0;
  }
}
