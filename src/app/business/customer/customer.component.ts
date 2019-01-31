
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { CustomerService } from 'src/app/services/business/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  tempFilter = [];
  customerList = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  constructor(private router: Router, private customerService: CustomerService) {
  }

  ngOnInit() {
    this.getCustomerList();
  }
  getCustomerList() {
    this.customerService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.customerList = response.data;
        this.tempFilter = this.customerList;
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
  search(event) {
    const val = event.target.value.toLowerCase();
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

}
