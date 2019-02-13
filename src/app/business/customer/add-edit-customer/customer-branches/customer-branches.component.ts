import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild } from '@angular/core';
import { AppConstant } from '../../../../app.constants';
import { BusinessService, BaseService, CommonService } from '../../../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-branches',
  templateUrl: './customer-branches.component.html'
})
export class CustomerBranchesComponent extends BaseService implements OnInit, OnChanges {
  branchesList = [];
  tempFilter = [];
  @Input() customerObj = {} as any;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  emptymessages = AppConstant.EMPTY_MESSAGES.BRANCHES;

  @ViewChild(DatatableComponent) branchtable: DatatableComponent;
  constructor(private customerService: BusinessService.CustomerService,
    private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
    private router: Router) {
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
          this.branchesList[index].status = response.data.status;
        }
        this.branchesList = [...this.branchesList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  search(event?) {
    this.branchesList = this.commonService.globalSearch(this.tempFilter, event);
    this.branchtable.offset = 0;
  }
  redirectToBranch(id) {
    this.router.navigate(['/business/branch', { flag: 'bd00085branch', id: id, }]);
  }
}
