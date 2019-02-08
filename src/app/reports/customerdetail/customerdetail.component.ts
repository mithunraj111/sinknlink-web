import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.scss']
})
export class CustomerdetailComponent implements OnInit {
  public configOpenTopBar: any = 'open';
  @ViewChild(DatatableComponent) table: DatatableComponent;
  tempFilter = [];

  constructor() { 
    this.tempFilter = this.businessList;
  }
  businessList = [
    {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },
    {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    }, {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    }, {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    }, {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },
    {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },
    {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    }, {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    }, {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    }, {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },
    {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },
    {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    }, {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    }, {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    }, {
      bizname: 'Sales', mobileno: '6410352356', regdate: '06-Feb-2019', membershiptype: 'paid', biztype: 'purchase',
      category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    }

  ];
  ngOnInit() {
  }
  toggleTopbar() {
    this.configOpenTopBar = this.configOpenTopBar === 'open' ? '' : 'open';
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
    this.businessList = temp;
    this.table.offset = 0;
  }
}
