import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  public data: any;
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: any;

  constructor(private router: Router) {
    this.data = [
      { rolename: 'Admin', dataaccess: 'Team', updatedby: 'Mithun' },
      { rolename: 'Operator', dataaccess: 'Team', updatedby: 'Raj' },
      { rolename: 'Manager', dataaccess: 'Team', updatedby: 'Mithunraj' },
      { rolename: 'Admin', dataaccess: 'Team', updatedby: 'Mithun' },
      { rolename: 'Operator', dataaccess: 'Team', updatedby: 'Raj' },
      { rolename: 'Manager', dataaccess: 'Team', updatedby: 'Mithunraj' },
      { rolename: 'Admin', dataaccess: 'Team', updatedby: 'Mithun' },
      { rolename: 'Operator', dataaccess: 'Team', updatedby: 'Mithunraj' },
      { rolename: 'Manager', dataaccess: 'Team', updatedby: 'Raj' },
      { rolename: 'Admin', dataaccess: 'Team', updatedby: 'Mithun' },
      { rolename: 'Operator', dataaccess: 'Team', updatedby: 'Mithunraj' },
      { rolename: 'Manager', dataaccess: 'Team', updatedby: 'Raj' }
    ];
    this.tempFilter = this.data;
    this.date = new Date();

  }

  ngOnInit() {

  }
  addRole() {
    this.router.navigate(['masters/roles/create']);
  }
  editRole(data) {
    this.router.navigate(['masters/roles/edit/' + 1]);
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
