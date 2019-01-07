import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: any;
  public data: any;
  tempFilter = [];
  buttontext: string;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router) {
    this.data = [
      { fullname: 'Mithunraj', mobileno: '9874563210', role: 'Admin', updatedby: 'Admin' },
      { fullname: 'Raj', mobileno: '9876543210', role: 'Manager', updatedby: 'Admin' },
      { fullname: 'Mithunraj', mobileno: '9517538426', role: 'Operator', updatedby: 'Admin' },
      { fullname: 'Mithunraj', mobileno: '9874563210', role: 'Admin', updatedby: 'Admin' },
      { fullname: 'Raj', mobileno: '9876543210', role: 'Manager', updatedby: 'Admin' },
      { fullname: 'Mithunraj', mobileno: '9517538426', role: 'Operator', updatedby: 'Admin' },
      { fullname: 'Mithunraj', mobileno: '9874563210', role: 'Admin', updatedby: 'Admin' },
      { fullname: 'Raj', mobileno: '9876543210', role: 'Manager', updatedby: 'Admin' },
      { fullname: 'Mithunraj', mobileno: '9874563210', role: 'Admin', updatedby: 'Admin' },
      { fullname: 'Raj', mobileno: '9876543210', role: 'Manager', updatedby: 'Admin' },
      { fullname: 'Raj', mobileno: '9876543210', role: 'Manager', updatedby: 'Admin' },
      { fullname: 'Mithunraj', mobileno: '9517538426', role: 'Operator', updatedby: 'Admin' },
      { fullname: 'Mithunraj', mobileno: '9517538426', role: 'Operator', updatedby: 'Admin' },
      { fullname: 'Mithunraj', mobileno: '9517538426', role: 'Operator', updatedby: 'Admin' }
    ];
    this.tempFilter = this.data;
    this.date = new Date();

  }

  ngOnInit() {
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  addUsers() {
    this.router.navigate(['masters/users/create']);
    this.buttontext = AppConstant.BUTTON_TXT.SAVE;
  }
  editUsers(data) {
    this.router.navigate(['masters/users/edit/' + 1]);
    this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
  }
  getRowHeight(row) {
    return row.height;
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