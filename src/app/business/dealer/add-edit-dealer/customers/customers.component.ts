import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppConstant } from '../../../../app.constants';
import { CustomerService } from 'src/app/services/business/customer.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as _ from 'lodash';
import { CommonService } from 'src/app/services';
@Component({
  selector: 'app-dealer-customers',
  templateUrl: './customers.component.html'
})
export class DealerCustomersComponent implements OnChanges, OnInit {
  public dealerCustomers: any = [];
  @ViewChild(DatatableComponent) customertable: DatatableComponent;
  @Input() dealerObj = {} as any;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  emptymessages = AppConstant.EMPTY_MESSAGES.DEALER_CUSTOMER;
  tempFilter = [];
  constructor(private customerService: CustomerService, private commonService: CommonService,
  ) {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getCustomers(changes.dealerObj.currentValue);
  }
  getCustomers(dealerObj) {
    if (!_.isUndefined(dealerObj.dealerid)) {
      const condition = {
        dealerid: Number(dealerObj.dealerid),
      } as any;
      if (!_.isNull(dealerObj.lastcommissionpaiddt)) {
        condition.commisiondate = dealerObj.lastcommissionpaiddt;
      }
      this.customerService.list(condition).subscribe((res) => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.dealerCustomers = response.data;
          this.tempFilter = this.dealerCustomers;

        }
      });
    }
  }
  search(event?) {
    this.dealerCustomers = this.commonService.globalSearch(this.tempFilter, event);
    this.customertable.offset = 0;
  }
}
