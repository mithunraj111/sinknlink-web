import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/app.constants';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { NgbDateParserFormatter, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOutTranslate } from '../../../../assets/animations/fadeInOutTranslate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService, CommonService, LocalStorageService, AdminService, BusinessService } from '../../../services';
import { CustomerCouponsComponent } from './customer-coupons/customer-coupons.component';
import { CustomerGigsComponent } from './customer-gigs/customer-gigs.component';
import { CustomerSettingsComponent } from './customer-settings/customer-settings.component';
import * as _ from 'lodash';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';
@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
  animations: [fadeInOutTranslate]
})
export class AddEditCustomerComponent implements OnInit {
  customerForm: FormGroup;
  socailIdForm: FormGroup;
  formTitle: string;
  buttonText = AppConstant.BUTTON_TXT.SAVE;
  workDays = AppConstant.WORKDAYS;
  @ViewChild(CustomerCouponsComponent) couponComponent: CustomerCouponsComponent;
  @ViewChild(CustomerGigsComponent) gigComponent: CustomerGigsComponent;
  @ViewChild(CustomerSettingsComponent) settingsComponent: CustomerSettingsComponent;
  @ViewChild('customertabs') customertabs: NgbTabset;
  paymentMethods = [];
  categoryList = [];
  memberTypes = [];
  businesstypes = [];
  deliveryMethods = [];
  locationList = [];
  paymentTenures = AppConstant.PAYMENT_TENURES;
  paymentStatus = AppConstant.PAYMENT_STATUS;
  customerid;
  userstoragedata = {} as any;
  customerErrObj = AppMessages.VALIDATION.BUSINESS;
  customerObj = {} as any;
  constructor(private fb: FormBuilder,
    private categoryService: MasterService.CategoryService,
    private lookupService: AdminService.LookupService,
    private commonService: CommonService,
    private localStorageService: LocalStorageService,
    private customerService: BusinessService.CustomerService,
    private bootstrapAlertService: BootstrapAlertService,
    private locationService: MasterService.LocationService,
    private route: ActivatedRoute
  ) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.customerid = params.id;
        this.getCustomerDetail();
      }
    });
  }

  ngOnInit() {
    this.initForm();
    this.getLookUps();
    this.getCategoryList();
    this.getLocationList();
  }
  getCustomerDetail() {
    this.customerService.byId(this.customerid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (response.data != null) {
          this.customerObj = response.data;
          this.generateEditForm();
        }
      }
    });
  }
  getLocationList() {
    this.locationService.list({ status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.value = item.locationid.toString();
          item.label = item.area + '(' + item.pincode + ')';
        });
        this.locationList = response.data;
      }
    });
  }
  getLookUps() {
    this.lookupService.list({ status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (response.data.length > 0) {
          response.data.map(item => {
            item.value = item.refvalue;
            item.label = item.refvalue;
          });
          let groupedData = _.groupBy(response.data, 'refkey');
          this.memberTypes = _.get(groupedData, 'biz_membertype');
          this.businesstypes = _.get(groupedData, 'biz_businesstype');
          this.paymentMethods = _.get(groupedData, 'biz_paymentmethods');
          this.deliveryMethods = _.get(groupedData, 'biz_deliverymethods');
        }
      }
    });
  }
  getCategoryList() {
    this.categoryService.list({ status: AppConstant.STATUS_ACTIVE }, '').subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.value = item.categoryid.toString();
          item.label = item.categoryname;
        });
        this.categoryList = response.data;
      }
    });
  }
  initForm() {
    this.customerForm = this.fb.group({
      bizname: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      biztype: [null, Validators.compose([Validators.required])],
      contactperson: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      contactmobile: [null, Validators.compose([Validators.required])],
      contactemail: ['', Validators.compose([ Validators.pattern('([a-z0-9&_\.-]*[@][a-z0-9]+((\.[a-z]{2,3})?\.[a-z]{2,3}))'), Validators.maxLength(100)])],
      phoneno: [[]],
      categoryid: [null, Validators.compose([Validators.required])],
      tags: [[], Validators.required],
      postaladdress: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(100)])],
      lat: [null, Validators.compose([Validators.required])],
      lng: [null, Validators.compose([Validators.required])],
      locationid: [null, Validators.compose([Validators.required])],
      workdays: [null, Validators.compose([Validators.required])],
      starttime: [null, Validators.required],
      endtime: [null, Validators.required],
      acceptedpayments: [null, Validators.required],
      deliveryoptions: [null, Validators.required],
      socialids: [[]],
      taxno: [null, Validators.compose([Validators.required, Validators.maxLength(30)])],
      website: ['', Validators.compose([Validators.required, Validators.maxLength(200), Validators.pattern('((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)')])],
      regdate: [new Date(), Validators.required],
      paymentstatus: [null, Validators.compose([Validators.required])],
      membershiptype: [null, Validators.compose([Validators.required])],
      paymenttenure: [null, Validators.compose([Validators.required])],
      status: [true, Validators.required],
      tncagreed: [false, Validators.required]
    });
    this.socailIdForm = this.fb.group({
      fb: [null],
      gmail: [null],
      twitter: [null],
      instagram: [null],
    });
    this.buttonText = AppConstant.BUTTON_TXT.SAVE;
  }
  openmap(){
    this.openModal('mapmodal');
  }
  addSocialId() {
    this.openModal('socialidmodal');
  }
  openModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  update(event) {
    let socialids = this.socailIdForm.value.fb + ',' + this.socailIdForm.value.twitter + ',' +
      this.socailIdForm.value.gmail + ',' + this.socailIdForm.value.instagram;
    this.customerForm.controls['socialids'].setValue(socialids);
    this.closeModal(event);
  }
  saveOrUpdateBusiness() {
    let errMessage: any;
    console.log(this.customerForm);
    if (!this.customerForm.valid) {
      errMessage = this.commonService.getFormErrorMessage(this.customerForm, this.customerErrObj);
      this.bootstrapAlertService.showError(errMessage);
      return false;
    } else {
      const data = this.customerForm.value;
      const formdata = { ...data } as any;
      formdata.workhours = data.starttime + '-' + data.endtime;
      formdata.locationid = Number(data.locationid);
      formdata.categoryid = Number(data.categoryid);
      formdata.regdate = this.commonService.formatDate(data.regdate);
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
      formdata.contactmobile = _.map(data.contactmobile, _.property('value'));
      formdata.tags = _.map(data.tags, _.property('value'));
      formdata.tncagreed = data.tncagreed ? 'Y' : 'N';
      formdata.socialids = this.socailIdForm.value;
      formdata.workhours = {
        starttime: data.starttime,
        endtime: data.endtime
      };
      formdata.geoaddress = {
        lat: data.lat,
        lng: data.lng
      };
      if (!_.isUndefined(this.customerObj) && !_.isEmpty(this.customerObj) && !_.isUndefined(this.customerObj.membershipid)) {
        formdata.status = data.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
        this.customerService.update(formdata, this.customerObj.membershipid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.customerObj = response.data;
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
        this.customerService.create(formdata).subscribe((res) => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.customerObj = response.data;
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
  saveOrUpdate() {
    switch (this.customertabs.activeId) {
      case '1':
        this.saveOrUpdateBusiness();
        break;
      case '4':
        this.settingsComponent.updateSettings(this.customerObj);
        break;
      case '5':
        if (this.gigComponent.gigForm.touched) {
          this.gigComponent.saveOrUpdateGig();
        }
        break;
      case '6':
        if (this.couponComponent.couponForm.touched) {
          this.couponComponent.saveOrUpdateCoupon();
        }
        break;
    }
  }
  onCustomerTabChange(event) {
    this.customerObj = this.customerObj;
  }

  generateEditForm() {
    this.customerObj.categoryid = this.customerObj.categoryid.toString();
    this.customerObj.locationid = this.customerObj.locationid.toString();
    this.customerObj.regdate = this.commonService.parseDate(this.customerObj.regdate);
    this.customerObj.starttime = this.customerObj.workhours.starttime;
    this.customerObj.endtime = this.customerObj.workhours.endtime;
    if (this.customerObj.geoaddress) {
      this.customerObj.lat = this.customerObj.geoaddress.lat;
      this.customerObj.lng = this.customerObj.geoaddress.lng;
    }
    this.customerObj.contactmobile = _.map(this.customerObj.contactmobile, function (item) {
      return {
        value: item,
        display: item
      };
    });
    this.customerObj.tags = _.map(this.customerObj.tags, function (item) {
      return {
        value: item,
        display: item
      };
    });
    this.customerObj.tncagreed = this.customerObj.tncagreed === 'Y' ? true : false;
    this.customerObj.status = (this.customerObj.status === AppConstant.STATUS_ACTIVE ? true : false);
    this.customerForm.patchValue(this.customerObj);
    if (this.customerObj.socialids != null) {
      this.socailIdForm.patchValue(this.customerObj.socialids);
    }
    this.buttonText = AppConstant.BUTTON_TXT.UPDATE;
  }
}
