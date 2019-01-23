import { Component, OnInit } from '@angular/core';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FancyNumberService } from 'src/app/services/admin/fancynumber.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppConstant } from 'src/app/app.constants';

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

  constructor(private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService,
    private fb: FormBuilder, private router: Router, private fancynumberService: FancyNumberService, private localStorageService: LocalStorageService) {
    this.vipForm = this.fb.group({
      statecode: [""],
      startnumber: ['0', [Validators.required]],
      endnumber: [""],
      status: [true],
      cost: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }
  submit() {
    if (this.vipForm.valid) {

      this.creatingNumbers = true;

      let data = this.vipForm.value;

      data["status"] = data["status"] == true ? 'Active' : 'InActive'
      data["createdby"] = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;
      data["createddt"] = new Date();
      data["startnumber"] = parseInt(data["startnumber"]);
      data["endnumber"] = parseInt(data["endnumber"]) || 0;

      this.fancynumberService.addNumbers(data).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.creatingNumbers = false;
          this.bootstrapAlertService.showSucccess(response.message);
          console.log(response);
        } else {
          this.creatingNumbers = false;
          this.bootstrapAlertService.showError(response.message);
        }
      })
    } else {
      this.bootstrapAlertService.showError(this.commonService.getFormErrorMessage(this.vipForm, this.vipErrObj));
    }
  }
}