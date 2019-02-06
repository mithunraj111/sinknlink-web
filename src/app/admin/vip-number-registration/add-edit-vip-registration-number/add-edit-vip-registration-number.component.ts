import { Component, OnInit } from '@angular/core';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FancyNumberService } from 'src/app/services/admin/fancynumber.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppConstant } from 'src/app/app.constants';
import { LookupService } from 'src/app/services/admin/lookup.service';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-add-edit-vip-registration-number',
  templateUrl: './add-edit-vip-registration-number.component.html',
  styleUrls: ['./add-edit-vip-registration-number.component.scss']
})
export class AddEditVipRegistrationNumberComponent implements OnInit {

  vipForm: FormGroup;
  vipErrObj = AppMessages.VALIDATION.FANCYNUMBER;
  errMessage;
  sucMessage;
  creatingNumbers = false;
  statelists = [];

  constructor(private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService,
    private fb: FormBuilder, private router: Router, private fancynumberService: FancyNumberService,
    private localStorageService: LocalStorageService,
    private lookupService: LookupService) {
    this.vipForm = this.fb.group({
      statecode: ['',[Validators.required]],
      startnumber: ['0', [Validators.required]],
      endnumber: [''],
      status: [true],
      price: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.lookupService.list({ refkey: 'biz_states', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.statelists = Lodash.map(response.data, function (n) { return { label: n.refname, value: n.refvalue } });
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  submit() {
    if (this.vipForm.valid) {

      this.creatingNumbers = true;

      let data = this.vipForm.value;

      data['status'] = data['status'] ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
      data['createdby'] = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;
      data['createddt'] = new Date();
      data['startnumber'] = parseInt(data['startnumber']);
      data['endnumber'] = parseInt(data['endnumber']) || 0;

      if ((data['endnumber']-data['startnumber']) < 0) {
        this.creatingNumbers = false;
        this.bootstrapAlertService.showError('VIP Number range not valid');
      } else {
        this.fancynumberService.addNumbers(data).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.creatingNumbers = false;
            this.bootstrapAlertService.showSucccess(response.message);
          } else {
            this.creatingNumbers = false;
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          let response = JSON.parse(err._body);
          this.bootstrapAlertService.showError(response.message);
          this.creatingNumbers = false;
        });
      }
    } else {
      this.bootstrapAlertService.showError(this.commonService.getFormErrorMessage(this.vipForm, this.vipErrObj));
    }
  }
}
