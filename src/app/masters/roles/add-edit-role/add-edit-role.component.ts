import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { RoleService } from '../../../services/masters/role.service';
import { LookupService } from '../../../services/admin/lookup.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit {

  rolename: string;
  status = AppConstant.STATUS_ACTIVE;
  dataaccess = 'All';
  roleid: number;
  isaddForm = true;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  screensList = [];
  permissionList = [];
  permissions = [];
  index;
  userstoragedata = {} as any;
  roleObj = {} as any;
  constructor(
    private route: ActivatedRoute,
    private bootstrapAlertService: BootstrapAlertService,
    private roleService: RoleService,
    private lookupService: LookupService,
    private localStorageService: LocalStorageService
  ) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.roleid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
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
        this.screensList = JSON.parse(response.data[0].refvalue);
      }
    });
  }
  openPermissionModal(event, data, rowindex) {
    const self = this;
    this.index = rowindex;
    _.each(data.permissions, function (item, index) {
      self.permissionList.push({ value: item, label: item });
      if (index + 1 === data.permissions.length) {
        self.permissionList = [...self.permissionList];
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
    document.querySelector('#' + event).classList.remove('md-show');
  }
  saveOrUpdateRole() {
    let formdata = {} as any;
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
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      }, err => {
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
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      }, err => {
        const error = JSON.parse(err._body);
        this.bootstrapAlertService.showError(error.message);
      });
    }
  }
}

