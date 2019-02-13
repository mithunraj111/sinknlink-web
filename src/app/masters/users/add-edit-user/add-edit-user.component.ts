import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../../../services/common.service';
import * as _ from 'lodash';
import { LocalStorageService } from '../../../services/local-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppMessages } from '../../../app-messages';
import { UserService } from '../../../services/masters/user.service';
import { RoleService } from '../../../services/masters/role.service';


@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  isaddForm = true;
  userid: number;
  pwd: any;
  generatepwd = false;
  userForm: FormGroup;
  roleList: any = [];
  userErrObj = AppMessages.VALIDATION.USER;
  errMessage;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  userstoragedata = {} as any;
  userObj = {} as any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private bootstrapAlertService: BootstrapAlertService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private roleService: RoleService) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.userid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
        this.getUserDetails();
      }
    });
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }
  ngOnInit() {
    this.initForm();
    this.getRoleList();
  }

  initForm() {
    this.userForm = this.fb.group({
      fullname: [null, Validators.compose([Validators.required, Validators.minLength(1),
      Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')])],
      mobileno: [null, Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      Validators.maxLength(13)])],
      rolename: [null, Validators.compose([Validators.required])],
      status: [true],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
    });
    this.userObj = {};
  }
  saveOrUpdateUser() {
    if (!this.userForm.valid) {
      this.errMessage = this.commonService.getFormErrorMessage(this.userForm, this.userErrObj);
      this.bootstrapAlertService.showError(this.errMessage);
      return false;
    } else {
      const formdata = new FormData();
      let dataValue = this.userForm.value;
      let data = {} as any;
      data.fullname = dataValue.fullname;
      data.mobileno = dataValue.mobileno;
      data.roleid = Number(dataValue.rolename);
      data.password = dataValue.password;
      data.updatedby = this.userstoragedata.fullname;
      data.updateddt = new Date();
      if (!_.isUndefined(this.userObj) && !_.isUndefined(this.userObj.userid) && !_.isEmpty(this.userObj)) {
        data.status = dataValue.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
        formdata.append('data', JSON.stringify(data));
        this.userService.update(formdata, this.userObj.userid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.router.navigate(['/masters/users/']);
          } else {
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.bootstrapAlertService.showError(err.message);
        });
      } else {
        data.status = AppConstant.STATUS_ACTIVE;
        data.createdby = this.userstoragedata.fullname;
        data.createddt = new Date();
        this.userService.create(data).subscribe((res) => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.router.navigate(['/masters/users/']);
          } else {
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.bootstrapAlertService.showError(err.message);
        });
      }
    }
  }
  getUserDetails() {
    this.userService.byId(this.userid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status && !_.isNull(response.data)) {
        this.userObj = response.data;
        this.userForm = this.fb.group({
          fullname: [this.userObj.fullname, Validators.compose([Validators.required, Validators.minLength(1),
          Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')])],
          mobileno: [this.userObj.mobileno, Validators.compose([Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.maxLength(13)])],
          rolename: [this.userObj.roleid.toString(), Validators.compose([Validators.required])],
          status: [this.userObj.status === AppConstant.STATUS_ACTIVE ? true : false, Validators.compose([Validators.required])],
          password: [this.userObj.password, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
        });
      }
    });
  }
  getRoleList() {
    this.roleService.list({ status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.roleList = [];
        const self = this;
        _.each(response.data, item => {
          if (item.rolename != 'Customer' && item.rolename != 'Dealer') {
            item.value = item.roleid.toString();
            item.label = item.rolename;
            self.roleList.push(item);
          }
        });
      } else {
        this.roleList = [];
      }
    });
  }
  generatepassword() {
    this.pwd = Math.floor(Math.random() * 9000000000) + 1000000000;
    this.userForm.controls['password'].setValue(this.pwd.toString());
    this.generatepwd = true;
  }
}
