import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {
  data: any[];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
 
  constructor() { 
    this.data = [
      { fullname: 'Pavithra', mobileno: '9874563210', membershipid: '89769', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9876543210', membershipid: '89769', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9876543210', membershipid: '89769', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'pavi', mobileno: '9874563210', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'pavi', mobileno: '9876543210', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'pavi', mobileno: '9874563210', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9876543210', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9874563210', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9876543210', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9876543210', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'Pavithra', mobileno: '9517538426', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' },
      { fullname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Selam', lastlogin: 'Admin' }
    ];
    this.tempFilter = this.data;
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
