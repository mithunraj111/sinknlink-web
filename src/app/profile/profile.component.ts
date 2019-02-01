import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../services/masters/role.service';
import { AppConstant } from '../app.constants';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/masters/user.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../services/common.service';
import { AppMessages } from '../app-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userObj = {} as any;
  userstoragedata = {} as any;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  errMessage;
  profileErrObj = AppMessages.VALIDATION.PROFILE;
  constructor(private fb: FormBuilder, private roleService: RoleService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router, private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService,
  ) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.getUser();
    this.initForm();

  }
  initForm() {
    this.profileForm = this.fb.group({
      newpassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
      confirmpassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
      fullname: [null, Validators.compose([Validators.minLength(1),
      Validators.maxLength(50), Validators.pattern('^[a-zA-Z]*$')])],
    });

  }
  changePassword() {
    console.log(this.profileForm)
    if (this.profileForm.status === AppConstant.STATUS_INVALID) {
      this.errMessage = this.commonService.getFormErrorMessage(this.profileForm, this.profileErrObj);
      this.bootstrapAlertService.showError(this.errMessage);
      return false;
    }
    if (this.profileForm.value['newpassword'] != this.profileForm.value['confirmpassword']) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.PROFILE.newpassword.equal);
      return false;
    }
    let formdata = {} as any;
    let data = this.profileForm.value;
    formdata.updatedby = this.userstoragedata.fullname;
    formdata.updateddt = new Date();
    formdata.password = data.newpassword;
    formdata.password = data.confirmpassword;
    this.userService.update(formdata, this.userstoragedata.userid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.bootstrapAlertService.showSucccess(response.message);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
      this.bootstrapAlertService.showError(err.message);

    });
  }
  getUser() {
    this.userService.byId(this.userstoragedata.userid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.userObj = response.data;
      }
    });
  }
  changeProfile() {
    let formdata = {} as any;
    let data = this.profileForm.value;
    formdata.updatedby = this.userstoragedata.fullname;
    formdata.updateddt = new Date();
    formdata.fullname = data.fullname;
    this.userService.update(formdata, this.userstoragedata.userid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.bootstrapAlertService.showSucccess(response.message);

      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
      this.bootstrapAlertService.showError(err.message);
    });
  }

  openProfileModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeProfileModal(event) {
    document.querySelector('#' + event).classList.remove('md-show');
  }
  updatePassword() {
    this.openProfileModal('profilemodal');
  }
  closePassword() {
    this.closeProfileModal('profilemodal');
  }
}