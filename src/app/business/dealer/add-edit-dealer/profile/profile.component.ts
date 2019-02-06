import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../../app.constants';
import { AppMessages } from '../../../../app-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../../../../services/common.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { LocationService } from '../../../../services/masters/location.service';
import { DealerService } from '../../../../services/business/dealer.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-dealer-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class DealerProfileComponent implements OnInit {
  dealerid: number;
  date_displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  dealerProfileForm: FormGroup;
  dealerProfileErrObj = AppMessages.VALIDATION.DEALER.PROFILE;
  userstoragedata = {} as any;
  locationList = [];
  dealerProfileObj = {} as any;
  constructor(private route: ActivatedRoute,
    private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private locationService: LocationService,
    private dealerService: DealerService) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.dealerid = params.id;
        this.getDealerDetails(this.dealerid);
      }
    });
  }

  ngOnInit() {
    this.getLocationList();
    this.initForm();
  }
  initForm() {
    this.dealerProfileForm = this.fb.group({
      dealername: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      mobileno: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      contactperson: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      phoneno: [null, Validators.compose([ Validators.minLength(10), Validators.maxLength(15), Validators.pattern('^[0-9 ]*$')])],
      locationid: ['', Validators.required],
      address: ['', Validators.maxLength(100)],
      commissionpercent: [null, Validators.compose([Validators.required, Validators.max(100)])],
      status: [true]
    });
  }
  getLocationList() {
    this.locationService.list({}).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.area + ' ( ' + item.pincode + ' )';
          item.value = item.locationid.toString();
        });
        this.locationList = response.data;
      }
    });
  }
  saveOrUpdateDealer() {
    let errMessage: any;
    if (this.dealerProfileForm.status === AppConstant.STATUS_INVALID) {
      errMessage = this.commonService.getFormErrorMessage(this.dealerProfileForm, this.dealerProfileErrObj);
      this.bootstrapAlertService.showError(errMessage);
      return false;
    } else {
      const data = this.dealerProfileForm.value;
      const formdata = { ...data } as any;
      formdata.locationid = Number(data.locationid);
      formdata.commissionpercent = Number(data.commissionpercent);
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
      if (!_.isUndefined(this.dealerProfileObj) && !_.isUndefined(this.dealerProfileObj.dealerid) && !_.isEmpty(this.dealerProfileObj)) {
        formdata.status = data.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
        this.dealerService.update(formdata, this.dealerProfileObj.dealerid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.dealerProfileObj = response.data;
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
        this.dealerService.create(formdata).subscribe((res) => {
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
  generateEditForm() {
    this.dealerProfileForm = this.fb.group({
      dealername: [this.dealerProfileObj.dealername, Validators.required],
      contactperson: [this.dealerProfileObj.contactperson, Validators.required],
      mobileno: [this.dealerProfileObj.mobileno, Validators.required],
      phoneno: [this.dealerProfileObj.phoneno],
      locationid: [this.dealerProfileObj.locationid.toString(), Validators.required],
      address: [this.dealerProfileObj.address],
      commissionpercent: [this.dealerProfileObj.commissionpercent, Validators.required],
      status: [this.dealerProfileObj.status === AppConstant.STATUS_ACTIVE ? true : false, Validators.required]
    });
  }
  getDealerDetails(id) {
    this.dealerid = id;
    this.dealerService.byId(id).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.dealerProfileObj = response.data;
        this.generateEditForm();
      }
    });
  }

}
