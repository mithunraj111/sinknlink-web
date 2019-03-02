import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { LocalStorageService, BaseService, MasterService, CommonService } from '../../services';
import { AppMessages } from '../../app-messages';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent extends BaseService implements OnInit {
  rolesList = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  emptymessages = AppConstant.EMPTY_MESSAGES.ROLES;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  loadingIndicator: boolean = true;
  roleid: number;
  constructor(private router: Router, private route: ActivatedRoute,
    private roleService: MasterService.RoleService,
    private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService) {
    super();
    this.getScreenDetails('m_roles');
    this.emptymessages = AppConstant.EMPTY_MESSAGES.ROLES;


  }

  ngOnInit() {
    this.getRoles();

  }
  getRoles() {
    this.loadingIndicator = true;
    this.roleService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
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
  copyRole(id) {
    this.router.navigate(['masters/roles/create'], { queryParams: { mode: 'copy', id: id } });
  }
  getRowHeight(row) {
    return row.height;
  }
  search(event?) {
    this.rolesList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }

  updateRoleStatus(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    if (flag) {
      this.roleService.delete(updateObj, data.roleid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess('#' + data.roleid + ' ' + response.message);
          this.rolesList.splice(index, 1);
          this.rolesList = [...this.rolesList];
        }
        else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }
    else {
      this.roleService.update(updateObj, data.roleid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.rolesList[index].status = response.data.status;
          this.rolesList = [...this.rolesList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }

  }
}
