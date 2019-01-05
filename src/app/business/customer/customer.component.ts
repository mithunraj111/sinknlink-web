// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-customer',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.scss']
// })
// export class CustomerComponent implements OnInit {

//   constructor(private router: Router) { }

//   ngOnInit() {
//   }
//   addUsers() {
//     this.router.navigate(['masters/users/create']);
//     // this.buttontext = AppConstant.BUTTON_TXT.SAVE;
//   }
//   // editUsers(data) {
//     // this.router.navigate(['masters/users/edit/' + 1]);
//     // this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
//   // }
// }
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  public expanded: any = {};
  public data: any;
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router) {
    this.data = [
      {
        businessname: 'testetstetstetstetstetetstetstet', mobileno: '9874563210', membershipid: '123', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'Pavithra', mobileno: '9876543210', membershipid: '89769', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'Pavithra', mobileno: '9876543210', membershipid: '89769', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'pavi', mobileno: '9874563210', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'pavi', mobileno: '9876543210', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'pavi', mobileno: '9874563210', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'Pavithra', mobileno: '9876543210', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'Pavithra', mobileno: '9874563210', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'Pavithra', mobileno: '9876543210', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'Pavithra', mobileno: '9876543210', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'Pavithra', mobileno: '9517538426', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      },
      {
        businessname: 'pavi', mobileno: '9517538426', membershipid: '89765', city: 'Salem',
        updatedby: 'Admin', updateddt: '02-Dec-2018 15:00'
      }
    ];
    this.tempFilter = this.data;
  }

  ngOnInit() {
  }

  addCustomer() {
    this.router.navigate(['business/customers/create']);
  }
  editCustomer(data) {
    this.router.navigate(['business/customers/create']);
  }
  getRowHeight(row) {
    return row.height;
  }
  // search(event) {
  //   const val = event.target.value.toLowerCase();
  //   const temp = this.tempFilter.filter(item => {
  //     for (const key in item) {
  //       if (("" + item[key]).toLocaleLowerCase().includes(val)) {
  //         return ("" + item[key]).toLocaleLowerCase().includes(val);
  //       }
  //     }
  //   });
  //   this.data = temp;
  //   this.table.offset = 0;
  // }
 }
