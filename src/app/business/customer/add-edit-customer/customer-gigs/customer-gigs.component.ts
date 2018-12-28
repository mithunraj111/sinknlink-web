import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customer-gigs',
  templateUrl: './customer-gigs.component.html',
  styleUrls: ['./customer-gigs.component.scss']
})
export class CustomerGigsComponent implements OnInit {
  data: any[];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() { 
    this.data=[
      { postname: 'Mithun', posttype: '001', postedby: 'Admin', posteddt: '02/12/2018' },
      { postname: 'Raj', posttype: '002', postedby: 'Admin', posteddt: '20/12/2018' },
      { postname: 'Mithunraj', posttype: '003', postedby: 'Admin', posteddt: '26/12/2018' },
      { postname: 'Myth', posttype: '004', postedby: 'Admin', posteddt: '23/12/2018' },
      { postname: 'Glaurang', posttype: '005', postedby: 'Admin', posteddt: '07/12/2018' }
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
