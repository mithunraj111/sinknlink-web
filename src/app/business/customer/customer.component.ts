
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../../app-messages';
import { BaseService, BusinessService } from '../../services';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent extends BaseService implements OnInit {
  tempFilter = [];
  customerList = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  constructor(private router: Router,
    private customerService: BusinessService.CustomerService,
    private bootstrapAlertService: BootstrapAlertService) {
    super();
    this.getScreenDetails('b_customers');
    this.getCustomerList();
  }

  ngOnInit() {
  }
  getCustomerList() {
    const condition = {} as any;
    if (this.userstoragedata.usertype === 'D') {
      condition.dealerid = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.DEALER).dealerid;
    }
    this.customerService.list(condition).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.customerList = response.data;
        this.tempFilter = this.customerList;
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  addCustomer() {
    this.router.navigate(['business/customers/create']);
  }
  editCustomer(id) {
    this.router.navigate(['business/customers/edit/' + id]);
  }
  getRowHeight(row) {
    return row.height;
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
    this.customerList = temp;
    this.table.offset = 0;
  }
  updateCustomerStatus(data, index, flag) {
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
          this.customerList.splice(index, 1);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
          this.customerList[index].status = response.data.status;
        }
        this.customerList = [...this.customerList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
}
