import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AppConstant } from '../../../app.constants';
import * as _ from 'lodash';
import { CommonService } from '../../../services/common.service';
import { AppMessages } from 'src/app/app-messages';
import { LookupService } from 'src/app/services/admin/lookup.service';

@Component({
  selector: 'app-add-edit-lookup',
  templateUrl: './add-edit-lookup.component.html',
  styleUrls: ['./add-edit-lookup.component.scss']
})
export class AddEditLookupComponent implements OnInit, OnChanges {
  userstoragedata = {} as any;
  lookupForm: FormGroup;
  formTitle = AppConstant.FORM_TITLE.LOOKUP.ADD;
  buttonTxt = AppConstant.BUTTON_TXT.SAVE;
  @Output() notifyLookupEntry: EventEmitter<any> = new EventEmitter();
  @Input() lookupObj = {} as any;
  errMessage;
  lookupErrObj = AppMessages.VALIDATION.LOOKUP;
  refid: number;
  datatypeList = [];
  constructor(
    private router: Router,
    private bootstrapAlertService: BootstrapAlertService,
    private lookupService: LookupService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private localstorageService: LocalStorageService) {
    this.userstoragedata = this.localstorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.initForm();
    this.getlookupList();
  }
  initForm() {
    this.lookupForm = this.fb.group({
      keyname: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      keyvalue: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      keydesc: [null, Validators.compose([Validators.maxLength(100)])],
      datatype: [null, Validators.required],
      defaultvalue: ['N', Validators.required],
      status: ['']
    });
    this.lookupObj = {};
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!_.isUndefined(changes.lookupObj) && !_.isEmpty(changes.lookupObj.currentValue)) {
      this.buttonTxt = AppConstant.BUTTON_TXT.UPDATE;
      this.formTitle = AppConstant.FORM_TITLE.LOOKUP.UPDATE;
      this.lookupObj = changes.lookupObj.currentValue;
      console.log(this.lookupObj);
      this.lookupForm = this.fb.group({
        keyname: [this.lookupObj.keyname, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
        keyvalue: [this.lookupObj.keyvalue, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
        keydesc: [this.lookupObj.keydesc, Validators.compose([Validators.maxLength(100)])],
        datatype: [this.lookupObj.datatype, Validators.required],
      });
    } else {
      this.initForm();
      this.buttonTxt = AppConstant.BUTTON_TXT.SAVE;
      this.formTitle = AppConstant.FORM_TITLE.LOOKUP.ADD;
    }
  }
  close(event) {
    this.notifyLookupEntry.emit({ close: true });
  }
  callParent(data) {
    setTimeout(() => {
      this.notifyLookupEntry.emit(data);
    }, 5000);
  }
  saveOrUpdateLookup() {
    if (this.lookupForm.status === AppConstant.STATUS_INVALID) {
      this.errMessage = this.commonService.getFormErrorMessage(this.lookupForm, this.lookupErrObj);
      this.bootstrapAlertService.showError(this.errMessage);
      return false;
    } else {
      const data = this.lookupForm.value;
      const formdata = {} as any;
      formdata.refkey = data.keyname;
      formdata.refvalue = data.keyvalue;
      formdata.keydesc = data.keydesc;
      formdata.datatype = data.datatype;
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
      if (!_.isUndefined(this.lookupObj) && !_.isUndefined(this.lookupObj.refid) && !_.isEmpty(this.lookupObj)) {
        formdata.status = data.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
        this.lookupService.update(formdata, this.lookupObj.refid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.callParent({ update: false, data: response.data });
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
        this.lookupService.create(formdata).subscribe((res) => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.callParent({ update: false, data: response.data });
          } else {
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.bootstrapAlertService.showError(err.message);
        });
      }
    }
  }
  getlookupList() {
    this.lookupService.list({ status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.datatypeList = response.data;
      }
    });
  }
}
