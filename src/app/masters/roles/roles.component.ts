import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { RoleService } from '../../services/masters/role.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AppMessages } from '../../app-messages';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

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
  userstoragedata = {} as any;
  constructor(private router: Router,
    private roleService: RoleService,
    private bootstrapAlertService: BootstrapAlertService,
    private localStorageService: LocalStorageService) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);

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

  updateRoleStatus(data, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    this.roleService.update(updateObj, data.roleid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.getRoles();
        if (flag) {
          this.bootstrapAlertService.showSucccess('#' + data.roleid + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
        }
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
}
