import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AppConstant } from '../../../app.constants';
import { CommonService } from '../../../services/common.service';
import { AppMessages } from 'src/app/app-messages';
import { LookupService } from 'src/app/services/admin/lookup.service';
import * as _ from 'lodash';

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
  savingLookup = false;
  @Output() notifyLookupEntry: EventEmitter<any> = new EventEmitter();
  @Input() lookupObj = {} as any;
  @Input() selectedKeyType: string;
  lookupErrObj = AppMessages.VALIDATION.LOOKUP;
  datatypeList = AppConstant.DATATYPES;
  keylist = AppConstant.LOOKUP;
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!_.isUndefined(changes.selectedKeyType) && !_.isUndefined(changes.selectedKeyType.currentValue)) {
      this.selectedKeyType = changes.selectedKeyType.currentValue;
    }
    if (!_.isUndefined(changes.lookupObj) && !_.isEmpty(changes.lookupObj.currentValue)
      && !_.isUndefined(changes.lookupObj.currentValue.refid)) {
      this.buttonTxt = AppConstant.BUTTON_TXT.UPDATE;
      this.formTitle = AppConstant.FORM_TITLE.LOOKUP.UPDATE;
      this.lookupObj = changes.lookupObj.currentValue;
      let selectedValue: any;
      const key = this.selectedKeyType;
      selectedValue = _.find(this.keylist, function (obj: any) {
        if (obj.value === key) { return obj; }
      });
      this.formTitle = 'EDIT ' + selectedValue.label;
      this.lookupForm = this.fb.group({
        refname: [this.lookupObj.refname, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
        refvalue: [this.lookupObj.refvalue, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
        datatype: [this.lookupObj.datatype, Validators.required],
        defaultvalue: [this.lookupObj.isdefault, Validators.required],
        status: [this.lookupObj.status, Validators.required]
      });
    } else {
      this.initForm();
      this.buttonTxt = AppConstant.BUTTON_TXT.SAVE;
    }
  }
  initForm() {
    this.savingLookup = true;
    this.lookupForm = this.fb.group({
      refname: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      refvalue: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      datatype: [null, Validators.required],
      defaultvalue: ['N', Validators.required],
      status: ['']
    });
    this.lookupObj = {};
    let selectedValue: any;
    const key = this.selectedKeyType;
    selectedValue = _.find(this.keylist, function (obj: any) {
      if (obj.value === key) { return obj; }
    });
    this.formTitle = 'ADD ' + selectedValue.label;
    this.buttonTxt = AppConstant.BUTTON_TXT.SAVE;
    this.savingLookup = false;
  }
  close(event) {
    this.notifyLookupEntry.emit({ close: true });
  }
  callParent(data) {
    // setTimeout(() => {
    this.notifyLookupEntry.emit(data);
    // }, 5000);
  }
  saveOrUpdateLookup() {
    let errMessage: any;
    if (!this.lookupForm.valid) {
      this.savingLookup = false;
      errMessage = this.commonService.getFormErrorMessage(this.lookupForm, this.lookupErrObj);
      this.bootstrapAlertService.showError(errMessage);
      return false;
    } else {
      this.savingLookup = true;
      const data = this.lookupForm.value;
      const formdata = {} as any;
      formdata.refkey = this.selectedKeyType;
      formdata.refname = data.refname;
      formdata.refvalue = data.refvalue;
      formdata.datatype = data.datatype;
      formdata.isdefault = data.defaultvalue;
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
      if (!_.isUndefined(this.lookupObj) && !_.isUndefined(this.lookupObj.refid) && !_.isEmpty(this.lookupObj)) {
        formdata.status = data.status;
        this.lookupService.update(formdata, this.lookupObj.refid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.savingLookup = false;
            this.bootstrapAlertService.showSucccess(response.message);
            this.callParent({ update: false, data: response.data });
          } else {
            this.savingLookup = false;
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.savingLookup = false;
          this.bootstrapAlertService.showError(err.message);
        });
      } else {
        formdata.status = AppConstant.STATUS_ACTIVE;
        formdata.createdby = this.userstoragedata.fullname;
        formdata.createddt = new Date();
        this.lookupService.create(formdata).subscribe((res) => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.savingLookup = false;
            this.bootstrapAlertService.showSucccess(response.message);
            this.callParent({ update: false, data: response.data });
          } else {
            this.bootstrapAlertService.showError(response.message);
            this.savingLookup = false;
          }
        }, err => {
          this.savingLookup = false;
          this.bootstrapAlertService.showError(err.message);
        });
      }
    }
  }
}
