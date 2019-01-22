import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { RoleService } from 'src/app/services/masters/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  rolesList = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;

  constructor(private router: Router, private roleService: RoleService) {
  }

  ngOnInit() {
    this.getRoles();
  }
  getRoles() {
    this.roleService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.rolesList = response.data;
        this.tempFilter = this.rolesList;
      }
    });
  }
  addRole() {
    this.router.navigate(['masters/roles/create']);
  }
  editRole(id) {
    this.router.navigate(['masters/roles/edit/' + id]);
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
    this.rolesList = temp;
    this.table.offset = 0;
  }
}
