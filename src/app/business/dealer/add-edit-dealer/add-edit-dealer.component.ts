import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppConstant } from '../../../app.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { fadeInOutTranslate } from '../../../../assets/animations/fadeInOutTranslate';
import { DealerCustomersComponent } from './customers/customers.component';
import * as _ from 'lodash';
import { BusinessService, LocalStorageService, MasterService, CommonService } from '../../../services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppMessages } from '../../../app-messages';
import { DealerPaymentsComponent } from './payments/payments.component';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { NgbDateParserFormatter, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { LookupService } from '../../../services/admin';
@Component({
  selector: 'app-add-edit-dealer',
  templateUrl: './add-edit-dealer.component.html',
  styleUrls: ['./add-edit-dealer.component.scss'],
  animations: [
    fadeInOutTranslate
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class AddEditDealerComponent implements OnInit {
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  dealerid: number;
  @Output() dealerObj = {} as any;
  @ViewChild(DealerCustomersComponent) dealerCustomers: DealerCustomersComponent;
  @ViewChild(DealerPaymentsComponent) paymentsComponent: DealerPaymentsComponent;
  @ViewChild('deleartabs') deleartabs: NgbTabset;
  dealerProfileForm: FormGroup;
  dealerProfileErrObj = AppMessages.VALIDATION.DEALER.PROFILE;
  dealerProfileObj = {} as any;
  userstoragedata = {} as any;
  cityList = [];
  cityName: string;
  locationList = [];
  adddealer;
  showbutton = true;
  isAddForm = true;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  constructor(private route: ActivatedRoute,
    private bootstrapAlertService: BootstrapAlertService,
    private dealerService: BusinessService.DealerService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder, private commonService: CommonService,
    private locationService: MasterService.LocationService,
    private lookupService: LookupService) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);

    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.dealerid = params.id;
        this.getDealerDetails(this.dealerid);
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
        this.isAddForm = false;
      }
    });
  }

  ngOnInit() {
    this.getCityList();
    this.initForm();
  }
  getCityList() {
    this.lookupService.list({ refkey: 'biz_businesscity', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.refname;
          item.value = item.refvalue;
        });
        this.cityList = this.cityList.concat(response.data);
      }
    });
  }
  selectCity(option) {
    this.cityName = option.value;
    this.getLocationList();
  }
  saveOrUpdate() {
    if (this.deleartabs.activeId === '1') {
      this.saveOrUpdateDealer();
    }
    if (this.deleartabs.activeId === '2') {
    }
    if (this.deleartabs.activeId === '3') {
      this.paymentsComponent.addpayment();
    }
  }
  onTabChange(event) {
    if (event.nextId === '2' && !_.isUndefined(this.dealerid)) {
      this.dealerid = this.dealerid;
    }
    if (event.nextId === '6' || event.nextId === '5' || event.nextId === '3') {
      this.showbutton = false;
    } else {
      this.showbutton = true;
    }
  }

  initForm() {
    this.dealerProfileForm = this.fb.group({
      dealername: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      mobileno: [null, Validators.compose([Validators.required,
      Validators.minLength(10), Validators.maxLength(15), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      contactperson: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      phoneno: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('^[0-9 ]*$')])],
      city: ['', Validators.required],
      locationid: ['', Validators.required],
      address: ['', Validators.maxLength(100)],
      commissionpercent: [null, Validators.compose([Validators.required, Validators.max(100)])],
      status: [true]
    });
  }
  getLocationList() {
    this.locationService.list({ city: this.cityName, status: AppConstant.STATUS_ACTIVE }).subscribe((res) => {
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
    if (!this.dealerProfileForm.valid) {
      errMessage = this.commonService.getFormErrorMessage(this.dealerProfileForm, this.dealerProfileErrObj);
      this.bootstrapAlertService.showError(errMessage);
      return false;
    } else {
      this.adddealer = true;
      const data = this.dealerProfileForm.value;
      const formdata = { ...data } as any;
      formdata.city = data.city;
      formdata.locationid = Number(data.locationid);
      if (_.isNaN(Number(data.commissionpercent)) || _.isNull(Number(data.commissionpercent))) {
        this.bootstrapAlertService.showError(this.dealerProfileErrObj.commissionpercent.invalid);
      }
      formdata.commissionpercent = Number(data.commissionpercent);
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
      if (!_.isUndefined(this.dealerProfileObj) && !_.isUndefined(this.dealerProfileObj.dealerid) && !_.isEmpty(this.dealerProfileObj)) {
        formdata.status = data.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
        this.dealerService.update(formdata, this.dealerProfileObj.dealerid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.adddealer = false;
            this.isAddForm = false;
            this.bootstrapAlertService.showSucccess(response.message);
            this.dealerProfileObj = response.data;
          } else {
            this.adddealer = false;
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.adddealer = false;
          const error = JSON.parse(err._body);
          this.bootstrapAlertService.showError(error.message);
        });
      } else {
        formdata.status = AppConstant.STATUS_ACTIVE;
        formdata.createdby = this.userstoragedata.fullname;
        formdata.createddt = new Date();
        this.dealerService.create(formdata).subscribe((res) => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.adddealer = false;
            this.isAddForm = false;
            this.bootstrapAlertService.showSucccess(response.message);
          } else {
            this.adddealer = false;
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.adddealer = false;
          const error = JSON.parse(err._body);
          this.bootstrapAlertService.showError(error.message);
        });
      }
    }
  }
  generateEditForm() {
    this.getLocationList();
    this.dealerProfileForm = this.fb.group({
      dealername: [this.dealerProfileObj.dealername, Validators.required],
      contactperson: [this.dealerProfileObj.contactperson, Validators.required],
      mobileno: [this.dealerProfileObj.mobileno, Validators.compose([Validators.required,
      Validators.minLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      phoneno: [this.dealerProfileObj.phoneno],
      city: [this.dealerProfileObj.location.city, Validators.required],
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
  notifyPayment(event) {
    this.dealerProfileObj.lastcommissionpaiddt = event.lastcommissionpaiddt;
  }
}
