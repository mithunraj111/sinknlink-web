import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { RoleService } from '../../../services/masters/role.service';
import { LookupService } from '../../../services/admin/lookup.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import * as _ from 'lodash';
import { AppMessages } from 'src/app/app-messages';
@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit {

  rolename: string;
  status = true;
  dataaccess = AppConstant.DEFAULT_DATA_ACCESS;
  roleid: number;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  screensList = [];
  permissionList = [];
  permissions = [];
  index;
  userstoragedata = {} as any;
  roleObj = {} as any;
  roleErrObj = AppMessages.VALIDATION.ROLES;
  disableButton = false;
  permissionModal = false;
  emptymessages = AppConstant.EMPTY_MESSAGES.ADDROLES;

  constructor(
    private route: ActivatedRoute,
    private bootstrapAlertService: BootstrapAlertService,
    private roleService: RoleService,
    private lookupService: LookupService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
    this.emptymessages = AppConstant.EMPTY_MESSAGES.ADDROLES;

    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.roleid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
        this.getRoleDetail(this.roleid);
      }
    });
  }

  ngOnInit() {
    this.getScreenNames();
  }

  getScreenNames() {
    this.lookupService.list({ refkey: 'app_screens', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (response.data.length != 0) {
          this.screensList = JSON.parse(response.data[0].refvalue);
          if (this.roleid) {
            const self = this;
            _.map(this.roleObj.uiactions, function (item, idx) {
              const data = _.find(self.screensList, { screencode: item.screencode });
              if (!_.isUndefined(data)) {
                const index = _.indexOf(self.screensList, data);
                self.screensList[index].assignedpermissions = item.assignedpermissions;
              }
              if (idx + 1 === self.roleObj.uiactions.length) {
                self.screensList = [...self.screensList];
              }
            });
          }
        }

      }
    });
  }
  openPermissionModal(event, data, rowindex) {
    this.permissions = [];
    this.permissionList = [];
    const self = this;
    this.index = rowindex;
    _.each(data.permissions, function (item, index) {
      self.permissionList.push({ value: item, label: item });
      if (index + 1 === data.permissions.length) {
        self.permissionList = [...self.permissionList];
        self.permissions = data.assignedpermissions;
        self.permissionModal = true;
        document.querySelector('#' + event).classList.add('md-show');
      }
    });
  }
  updatePermissions() {
    this.screensList[this.index].assignedpermissions = this.permissions;
    this.screensList = [...this.screensList];
    this.closePermissionModal('permission');
  }
  getRowHeight(row) {
    return row.height;
  }
  closePermissionModal(event) {
    this.permissionModal = false;
  }
  saveOrUpdateRole() {

    if (_.isEmpty(this.rolename) || _.isUndefined(this.rolename) || _.isNull(this.rolename)) {
      this.bootstrapAlertService.showError(this.roleErrObj.rolename.required);
      return false;
    }
    if (this.rolename.length > 50) {
      this.bootstrapAlertService.showError(this.roleErrObj.rolename.maxlength);
      return false;
    } else if (_.isEmpty(this.dataaccess) || _.isUndefined(this.dataaccess) || _.isNull(this.dataaccess)) {
      this.bootstrapAlertService.showError(this.roleErrObj.dataaccess);
      return false;
    } else {
      this.disableButton = true;
      const formdata = {} as any;
      formdata.rolename = this.rolename;
      formdata.dataaccess = this.dataaccess;
      formdata.uiactions = this.screensList;
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
      if (!_.isUndefined(this.roleObj) && !_.isUndefined(this.roleObj.roleid) && !_.isEmpty(this.roleObj)) {
        formdata.status = this.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
        this.roleService.update(formdata, this.roleObj.roleid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.router.navigate(['/masters/roles']);
          } else {
            this.disableButton = false;
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.disableButton = false;
          this.bootstrapAlertService.showError(err.message);
        });
      } else {
        formdata.status = AppConstant.STATUS_ACTIVE;
        formdata.createdby = this.userstoragedata.fullname;
        formdata.createddt = new Date();
        this.roleService.create(formdata).subscribe((res) => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.router.navigate(['/masters/roles']);
          } else {
            this.disableButton = false;
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.disableButton = false;
          const error = JSON.parse(err._body);
          this.bootstrapAlertService.showError(error.message);
        });
      }
    }
  }

  getRoleDetail(id) {
    this.roleService.byId(id).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.roleObj = response.data;
        this.rolename = response.data.rolename;
        this.dataaccess = response.data.dataaccess;
        this.status = response.data.status === AppConstant.STATUS_ACTIVE ? true : false;
      }
    });
  }
}

