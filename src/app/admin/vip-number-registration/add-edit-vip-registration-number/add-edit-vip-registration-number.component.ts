import { Component, OnInit } from '@angular/core';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FancyNumberService } from 'src/app/services/admin/fancynumber.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppConstant } from 'src/app/app.constants';
import { LookupService } from 'src/app/services/admin/lookup.service';
import * as Lodash from 'lodash';
import { CustomerService } from 'src/app/services/business';

@Component({
  selector: 'app-add-edit-vip-registration-number',
  templateUrl: './add-edit-vip-registration-number.component.html',
  styleUrls: ['./add-edit-vip-registration-number.component.scss'],
})
export class AddEditVipRegistrationNumberComponent implements OnInit {

  vipForm: FormGroup;
  vipErrObj = AppMessages.VALIDATION.FANCYNUMBER;
  errMessage;
  sucMessage;
  creatingNumbers = false;
  statelists = [];

  editMode: boolean = false;
  bizId;
  business: any = {};
  ownedNos: any = [];
  allocated: any = {};

  constructor(private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService,
    private fb: FormBuilder, private router: Router, private fancynumberService: FancyNumberService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private lookupService: LookupService) {
    this.vipForm = this.fb.group({
      statecode: ['', [Validators.required]],
      startnumber: ['0', [Validators.required]],
      endnumber: [''],
      status: [true],
      price: [null, [Validators.required]]
    });
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.bizId = params.id;
        this.editMode = true;
        this.getBusiness(this.bizId);
        this.getOwnedFancyNos(this.bizId);
      }
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

  getBusiness(id) {
    this.customerService.list({
      membershipid: parseInt(id)
    }, 'getBranches').subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.business = response.data[0];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
    });
  }

  getOwnedFancyNos(id) {
    this.fancynumberService.getList({
      membershipid: parseInt(id)
    }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.ownedNos = Lodash.map(response.data, (o) => {
          return {
            label: o.fancyno,
            value: o.fancyid
          }
        });
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }

  submit() {
    if (!this.editMode) {
      if (this.vipForm.valid) {

        this.creatingNumbers = true;

        let data = this.vipForm.value;
        data['status'] = data['status'] ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
        data['createdby'] = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;
        data['createddt'] = new Date();
        data['startnumber'] = parseInt(data['startnumber']);
        data['endnumber'] = parseInt(data['endnumber']) || 0;
        if ( (data['endnumber'] != '') && ((data['endnumber'] - data['startnumber']) < 0) )  {
          this.creatingNumbers = false;
          this.bootstrapAlertService.showError('VIP Number range not valid');
        } else {
          this.fancynumberService.addNumbers(data).subscribe(res => {
            const response = JSON.parse(res._body);
            if (response.status) {
              this.creatingNumbers = false;
              this.bootstrapAlertService.showSucccess(response.message);
              this.router.navigate(['/admin/vipnumberregistration/']);
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
    } else {
      // this.allocateFancyNos();
    }
  }

  allocateFancyNos(param?, mid?) {

    let data = {
      membershipid: mid,
      membershipcode: param.label,
      updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname,
      parentmembershipid: parseInt(this.bizId),
      fancyid: param.value
    }

    this.fancynumberService.updateallocation(data).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.bootstrapAlertService.showSucccess(response.message);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    })
  }

}
