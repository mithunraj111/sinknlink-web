import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {
  data: any[];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: any;
  constructor() {
    this.data = [
      { fullname: 'Pavithra', mobileno: '9874563210', membershipid: '89769', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9876543210', membershipid: '89769', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9876543210', membershipid: '89769', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'pavi', mobileno: '9874563210', membershipid: '89765', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'pavi', mobileno: '9876543210', membershipid: '89765', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'pavi', mobileno: '9874563210', membershipid: '89765', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9876543210', membershipid: '89765', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9874563210', membershipid: '89765', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9876543210', membershipid: '89765', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9876543210', membershipid: '89765', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9517538426', membershipid: '89765', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Salem', updatedby: 'Admin' },
      { fullname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Salem', updatedby: 'Admin' }
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
  getRowHeight(row) {
    return row.height;
  }
}
