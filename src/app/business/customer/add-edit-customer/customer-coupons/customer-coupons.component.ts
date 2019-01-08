import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';

@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html',
  styleUrls: ['./customer-coupons.component.scss']
})
export class CustomerCouponsComponent implements OnInit {
  data: any[];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  date: any;
  constructor() {
    this.data = [
      { couponcode: 'Asp159', numberofcoupons: '100', claimed: 'Yes', expiresat: '02/12/2018' },
      { couponcode: 'YDF752', numberofcoupons: '50', claimed: 'Yes', expiresat: '20/12/2018' },
      { couponcode: 'FDG987', numberofcoupons: '75', claimed: 'Yes', expiresat: '26/12/2018' },
      { couponcode: 'TYR247', numberofcoupons: '88', claimed: 'Yes', expiresat: '23/12/2018' },
      { couponcode: 'TTO052', numberofcoupons: '92', claimed: 'Yes', expiresat: '07/12/2018' }
    ];
    this.tempFilter = this.data;
    this.date = new Date();

  }

  ngOnInit() {
  }
  search(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempFilter.filter(item => {
      for (let key in item) {
        if (("" + item[key]).toLocaleLowerCase().includes(val)) {
          return ("" + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.data = temp;
    this.table.offset = 0;
  }
}
