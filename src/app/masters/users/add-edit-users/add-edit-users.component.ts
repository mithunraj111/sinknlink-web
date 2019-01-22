import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../../../services/common.service';
import * as _ from 'lodash';
import { LocalStorageService } from '../../../services/local-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppMessages } from '../../../app-messages';
import { UserService } from '../../../services/masters/user.service';



@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent implements OnInit {
  isaddForm = true;
  userid: number;
  userForm: FormGroup;
  userErrObj = AppMessages.VALIDATION.USER;
  errMessage;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: any;
  userstoragedata = {} as any;
  @Output() notifyUserEntry: EventEmitter<any> = new EventEmitter();
  @Input() userObj = {} as any;
  constructor(private route: ActivatedRoute, private bootstrapAlertService: BootstrapAlertService,
    private fb: FormBuilder, private commonService: CommonService, private localStorageService: LocalStorageService,
    private userService: UserService ) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.userid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
      }
    });
    this.date = new Date();
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }
  ngOnInit() {
    this.initForm();
    console.log(this.userForm);
  }

  initForm() {
    this.userForm = this.fb.group({
      fullname: [null, Validators.compose([Validators.required, Validators.minLength(1),
      Validators.maxLength(50), Validators.pattern('^[a-zA-Z]*$')])],
      mobileno: [null, Validators.compose([Validators.required, Validators.minLength(8),
      Validators.maxLength(12), Validators.pattern('^[0-9]*$')])],
      rolename: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
    });
    this.userObj = {};
  }
  saveupdateuser() {
    if (this.userForm.status === 'INVALID') {
      this.errMessage = this.commonService.getFormErrorMessage(this.userForm, this.userErrObj);
      this.bootstrapAlertService.showError(this.errMessage);
      return false;
    } else {
      let data = this.userForm.value;
      let formdata = {} as any;
      formdata.fullname = data.fullname;
      formdata.mobileno = data.mobileno;
      formdata.roleid = data.rolename;
      formdata.password = data.password;
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
      if (!_.isUndefined(this.userObj) && !_.isUndefined(this.userObj.userid) && !_.isEmpty(this.userObj)) {
        formdata.status = data.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
        this.userService.update(formdata, this.userObj.userid).subscribe(res => {
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
        this.userService.create(formdata).subscribe((res) => {
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
    }
  }
}
