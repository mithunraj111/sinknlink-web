import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/app.constants';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { NgbDateParserFormatter, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOutTranslate } from '../../../../assets/animations/fadeInOutTranslate';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MasterService, CommonService, LocalStorageService, AdminService, BusinessService, MapService } from '../../../services';
import { CustomerCouponsComponent } from './customer-coupons/customer-coupons.component';
import { CustomerGigsComponent } from './customer-gigs/customer-gigs.component';
import { CustomerSettingsComponent } from './customer-settings/customer-settings.component';
import * as _ from 'lodash';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';
import { CustomerGalleryComponent } from './customer-gallery/customer-gallery.component';
import { CustomerBranchesComponent } from './customer-branches/customer-branches.component';
import { FancyNumberService, AppPlanService } from 'src/app/services/admin';
import { CustomerPaymentsComponent } from './customer-payments/customer-payments.component';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    MapService
  ],
  animations: [fadeInOutTranslate]
})
export class AddEditCustomerComponent implements OnInit {
  isActive = false;
  customerForm: FormGroup;
  socialidForm: FormGroup;
  // onlinepresenceForm: FormGroup;
  formTitle: string;
  buttonText = AppConstant.BUTTON_TXT.SAVE;
  savecustomer;
  tooltipmessage;
  workDays = AppConstant.WORKDAYS;
  showbutton = true;
  hidebutton = false;
  ownedNos = [];
  loadingIndicator = true;
  @ViewChild(CustomerCouponsComponent) couponComponent: CustomerCouponsComponent;
  @ViewChild(CustomerPaymentsComponent) paymentComponent: CustomerPaymentsComponent;
  @ViewChild(CustomerGigsComponent) gigComponent: CustomerGigsComponent;
  @ViewChild(CustomerSettingsComponent) settingsComponent: CustomerSettingsComponent;
  @ViewChild(CustomerGalleryComponent) galleryComponent: CustomerGalleryComponent;
  @ViewChild(CustomerBranchesComponent) branchComponent: CustomerBranchesComponent;
  @ViewChild('customertabs') customertabs: NgbTabset;
  paymentMethods = [];
  categoryList = [];
  cityLists = [];
  memberTypes = [];
  // onlinePresenceList = [];
  businesstypes = [];
  deliveryMethods = [];
  locationList = [];
  mallsList = [];
  paymentTenuresList = [];
  appplans = [];
  paymentStatus = AppConstant.PAYMENT_STATUS;
  customerid;
  userstoragedata = {} as any;
  customerErrObj = AppMessages.VALIDATION.BUSINESS;
  customerObj = {} as any;
  locationObj = {} as any;
  branchFlag = false;
  parentid;
  cityName: string;
  customerlat: any;
  customerlng: any;
  isAddForm = true;
  msg: string;
  lookupList: any = [];
  memCode: any;
  // presence: any[];
  constructor(private fb: FormBuilder,
    private categoryService: MasterService.CategoryService,
    private lookupService: AdminService.LookupService,
    private commonService: CommonService,
    private localStorageService: LocalStorageService,
    private customerService: BusinessService.CustomerService,
    private bootstrapAlertService: BootstrapAlertService,
    private locationService: MasterService.LocationService,
    private route: ActivatedRoute,
    private mapService: MapService,
    private fancynumberService: FancyNumberService,
    private appPlanService: AppPlanService
  ) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.customerid = params.id;
        this.getCustomerDetail();
        this.isAddForm = false;
      }
      if (params.id === undefined) {
        this.loadingIndicator = false;
      }
      if (params.flag !== undefined) {
        this.branchFlag = true;
        this.parentid = params.parentid;
      }
    });
    if (this.userstoragedata.roleid === 3 && !this.branchFlag) {
      this.customerid = this.userstoragedata.customer.membershipid;
      this.getCustomerDetail();
      this.isAddForm = false;
    }
  }

  ngOnInit() {
    this.initForm();
    this.getLookUps();
    this.getCategoryList();
    this.getPaymentTenureList();
    if (this.userstoragedata.roleid === 3) {
      this.customerForm.controls["membershiptype"].disable();
    }
  }
  getPaymentTenureList() {
    this.appPlanService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.appplans = response.data;
        response.data.map(item => {
          item.value = item.planid.toString();
          item.label = item.planname;
        });
        this.paymentTenuresList = response.data;
        // Edit Mode
        if (this.customerObj) {
          this.customerForm.controls['paymenttenure'].setValue(this.customerObj.paymenttenure);
        }
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }

  getCustomerDetail() {
    this.customerService.byId(this.customerid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (response.data != null) {
          this.customerObj = response.data;
          this.isActive = this.customerObj.status == AppConstant.STATUS_ACTIVE ? true : false;
          this.getLocationList();
          this.generateEditForm();
        }
      }
    });
  }
  getLocationList() {
    this.locationService.list({ city: this.cityName, status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.value = item.locationid.toString();
          item.label = item.area + '(' + item.pincode + ')';
        });
        this.locationList = response.data;
        this.loadingIndicator = false;
      }
    });
  }
  selectLocation(option) {
    this.locationObj = option;
  }
  selectCity(option) {
    this.cityName = option.value;
    this.mallsList = [];
    this.lookupList.forEach(element => {
      if (element.refname === option.value) {
        this.mallsList.push(element);
      }
    });
    this.customerForm.get('locationid').setValidators(Validators.required);
    this.customerForm.get('locationid').updateValueAndValidity();
    this.getLocationList();
  }
  getLookUps() {
    this.lookupService.list({ status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (response.data.length > 0) {
          response.data.map(item => {
            item.value = item.refvalue;
            item.label = item.refname;
            if (item.refkey === 'biz_malls') {
              item.label = item.refvalue;
            }
          });
          const groupedData = _.groupBy(response.data, 'refkey');
          this.memberTypes = _.get(groupedData, 'biz_membertype');
          this.businesstypes = _.get(groupedData, 'biz_businesstype');
          this.paymentMethods = _.get(groupedData, 'biz_paymentmethods');
          this.deliveryMethods = _.get(groupedData, 'biz_deliverymethods');
          // this.onlinePresenceList = _.get(groupedData, 'biz_onlinepresence');
          if (!this.isAddForm) {
            this.mallsList = _.get(groupedData, 'biz_malls');
          }
          this.lookupList = _.get(groupedData, 'biz_malls');
          // this.paymentTenuresList = _.get(groupedData, 'biz_paymenttenure');
          this.cityLists = _.get(groupedData, 'biz_businesscity');
        }
        if (this.customerid == null) {
          let selectedMemberType;
          _.each(this.memberTypes, function (item) {
            if (item.isdefault === 'Y') {
              selectedMemberType = item.refvalue;
            }
          });
          const selectedBusinessType = [];
          _.each(this.businesstypes, function (item) {
            if (item.isdefault === 'Y') {
              selectedBusinessType.push(item.refvalue);
            }
          });
          const selectedPaymentMethods = [];
          _.each(this.paymentMethods, function (item) {
            if (item.isdefault === 'Y') {
              selectedPaymentMethods.push(item.refvalue);
            }
          });
          const selectedDeliveryOpts = [];
          _.each(this.deliveryMethods, function (item) {
            if (item.isdefault === 'Y') {
              selectedDeliveryOpts.push(item.refvalue);
            }
          });
          // const selectedPaymentTenure = [];
          // _.each(this.paymentTenuresList, function (item) {
          //   if (item.isdefault === 'Y') {
          //     selectedPaymentTenure.push(item.refvalue);
          //   }
          // });
          this.customerForm.controls['membershiptype'].setValue(selectedMemberType);
          this.customerForm.controls['biztype'].setValue(selectedBusinessType);
          this.customerForm.controls['acceptedpayments'].setValue(selectedPaymentMethods);
          // this.customerForm.controls['deliveryoptions'].setValue(selectedDeliveryOpts);
          // this.customerForm.controls['paymenttenure'].setValue(selectedPaymentTenure);
          this.customerForm.get('paymenttenure').setValidators(Validators.required);
          this.customerForm.get('paymentstatus').setValidators(Validators.required);
          this.customerForm.get('paymentstatus').updateValueAndValidity();
          // this.customerForm.get('paymenttenure').updateValueAndValidity();
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
      biztype: [null, Validators.required],
      bizdescription: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(500)])],
      contactperson: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      contactmobile: [null, Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      contactemail: ['', Validators.compose([Validators.pattern(AppConstant.REGEX.EMAIL), Validators.maxLength(100)])],
      phoneno: [[]],
      categoryid: [null, Validators.required],
      tags: [[], Validators.required],
      postaladdress: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      city: ['', Validators.required],
      locationid: [null, Validators.required],
      workdays: [_.map(this.workDays, _.property('value')), Validators.required],
      starttime: ['09:00', Validators.required],
      endtime: ['21:00', Validators.required],
      acceptedpayments: [null, Validators.required],
      deliveryoptions: [null],
      socialids: [[]],
      // onlinepresence: [[]],
      taxno: ['', Validators.compose([Validators.maxLength(30)])],
      website: ['', Validators.compose([Validators.maxLength(200), Validators.pattern(AppConstant.REGEX.WEBSITE)])],
      regdate: [this.commonService.getCurrentDate('Y'), Validators.required],
      paymentstatus: [''],
      membershiptype: [null, Validators.required],
      paymenttenure: [''],
      status: [true, Validators.required],
      tncagreed: [false, Validators.required],
      landmark: ['', Validators.maxLength(50)],
      inmallyn: [false],
      mallname: ['']
    });
    this.socialidForm = this.fb.group({
      facebookid: [''],
      googleid: [''],
      twitterid: [''],
      instagramid: [''],
    });
    this.buttonText = AppConstant.BUTTON_TXT.SAVE;
  }

  addSocialId() {
    this.openModal('socialidmodal');
  }
  addOnlinePresence() {
    // let tenureList: any = this.paymentTenuresList;
    // for (let list of tenureList) {
    //   console.log(list);
    // }

    // this.onlinepresenceForm = this.fb.group({});
    this.openModal('onlinepresencemodal');
  }
  openModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeModal(event) {
    document.querySelector('#' + event).classList.remove('md-show');
  }
  // updateonlinepresence() {
  //   let data: any;
  //   data = {};
  //   for( let list of this.onlinePresenceList) {

  //     data[list.refname] = this.presence[list+1];
  //   }
  //   console.log(data);
    // let onlinepresence = '';
    // _.map(this.onlinepresenceForm.value, function (value, key) {
    //   console.log('2');
    //   console.log(value);
    //   console.log(key);
    //   if (value != null && value != '') {
    //     onlinepresence = onlinepresence + value + ',';
    //     console.log(onlinepresence);
    //   }
    //   self.customerForm.controls['onlinepresence'].setValue(onlinepresence);
    // });
    // console.log(self.customerForm.controls['onlinepresence'].value);
    // this.closeModal('onlinepresencemodal');
  // }
  update() {
    let socialids = '';
    const self = this;
    _.map(this.socialidForm.value, function (value, key) {
      if (value != null && value != '') {
        socialids = socialids + value + ',';
      }
      self.customerForm.controls['socialids'].setValue(socialids);
    });
    this.closeModal('socialidmodal');
  }
  saveOrUpdateBusiness() {
    let errMessage: any;
    if (!this.customerForm.valid) {
      errMessage = this.commonService.getFormErrorMessage(this.customerForm, this.customerErrObj);
      this.bootstrapAlertService.showError(errMessage);
      return false;
    } else {
      const data = this.customerForm.value;
      const formdata = { ...data } as any;
      if (_.isNaN(parseFloat(data.latitude)) || _.isNull(parseFloat(data.latitude))) {
        this.bootstrapAlertService.showError(this.customerErrObj.latitude.invalid);
        return false;
      }
      if (_.isNaN(parseFloat(data.longitude)) || _.isNull(parseFloat(data.longitude))) {
        this.bootstrapAlertService.showError(this.customerErrObj.longitude.invalid);
        return false;
      }
      if (this.branchFlag && this.parentid) {
        formdata.parentmembershipid = Number(this.parentid);
      }
      if (formdata.membershiptype != AppConstant.MEM_TYPE) {
        const paymentarray = this.paymentTenuresList.find((item) => {
          if (item.planid === data.paymenttenure) {
            return item.planid;
          }
        });

        if (!_.isUndefined(paymentarray)) {
          formdata.paymenttenure = paymentarray.planid.toString();
          var date = new Date();
          var days = paymentarray.noofdays + paymentarray.trialperiod;
          formdata.nextdue = new Date(date.setDate(date.getDate() + days)).toISOString();
        }
      } else {
        formdata.paymenttenure = '';
      }
      // if (formdata.membershiptype != AppConstant.MEM_TYPE) {
      //   const paymentarray = this.paymentTenuresList.find(item =>
      //     item.refvalue === data.paymenttenure
      //   );
      // if (!_.isUndefined(paymentarray)) {
      //   formdata.paymenttenure = paymentarray.refid.toString();
      //   var date = new Date();
      //   if (paymentarray.refname == "Yearly") {
      //     formdata.nextdue = new Date(date.setDate(date.getDate() + 365)).toISOString();
      //   } else if (paymentarray.refname == "Half yearly") {
      //     formdata.nextdue = new Date(date.setDate(date.getDate() + 183)).toISOString();
      //   } else if (paymentarray.refname == "Quarterly") {
      //     formdata.nextdue = new Date(date.setDate(date.getDate() + 90)).toISOString();
      //   } else if (paymentarray.refname == "Monthly") {
      //     formdata.nextdue = new Date(date.setDate(date.getDate() + 28)).toISOString();
      //   }
      // }
      // } else {
      //   formdata.paymenttenure = '';
      // }
      this.savecustomer = true;
      formdata.workhours = data.starttime + '-' + data.endtime;
      formdata.city = data.city;
      formdata.locationid = Number(data.locationid);
      formdata.categoryid = Number(data.categoryid);
      formdata.latitude = parseFloat(data.latitude);
      formdata.longitude = parseFloat(data.longitude);
      formdata.regdate = this.commonService.formatDate(data.regdate);
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
      formdata.phoneno = _.map(data.phoneno, _.property('value'));
      formdata.tags = _.map(data.tags, _.property('value'));
      formdata.tncagreed = data.tncagreed ? 'Y' : 'N';
      formdata.inmallyn = data.inmallyn ? 'Y' : 'N';
      if (formdata.inmallyn === 'Y') {
        formdata.mallname = formdata.mallname;
      }
      if (formdata.deliveryoptions === null) {
        formdata.deliveryoptions = [];
      }
      formdata.socialids = this.socialidForm.value;
      formdata.workhours = {
        starttime: data.starttime,
        endtime: data.endtime
      };
      formdata.geoaddress = {
        lat: data.latitude,
        lng: data.longitude
      };
      formdata.contactmobile = [];
      formdata.contactmobile[0] = (data.contactmobile).toString();
      if (this.userstoragedata.usertype === 'D') {
        formdata.dealerid = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.DEALER).dealerid;
      }
      formdata.paymenttenure = formdata.paymenttenure.toString();
      formdata.locationobj = JSON.stringify(_.find(this.locationList, { locationid: formdata.locationid }));
      formdata.businessobj = JSON.stringify(formdata);
      if (!_.isUndefined(this.customerObj) && !_.isEmpty(this.customerObj) && !_.isUndefined(this.customerObj.membershipid)) {
        formdata.status = data.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
        this.customerService.update(formdata, this.customerObj.membershipid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.savecustomer = false;
            this.bootstrapAlertService.showSucccess(response.message);
            this.customerObj = response.data;
          } else {
            this.savecustomer = false;
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.savecustomer = false;
          const error = JSON.parse(err._body);
          this.bootstrapAlertService.showError(error.message);
        });
      } else {
        let random_string = '';
        let random_ascii;
        for (let i = 0; i < 3; i++) {
          random_ascii = Math.floor((Math.random() * 25) + 65);
          random_string += String.fromCharCode(random_ascii)
        }
        formdata.membershipcode = (this.locationObj.state ? this.locationObj.state : '') + (Math.round(Math.random() * 100000).toString()) + (random_string);
        formdata.status = AppConstant.STATUS_ACTIVE;
        formdata.createdby = this.userstoragedata.fullname;
        formdata.createddt = new Date();
        this.customerService.create(formdata).subscribe((res) => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.savecustomer = false;
            this.customerObj = response.data;
            this.isAddForm = false;
            this.bootstrapAlertService.showSucccess(response.message);
            this.isActive = true;
          } else {
            this.savecustomer = false;
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.savecustomer = false;
          const error = JSON.parse(err._body);
          this.bootstrapAlertService.showError(error.message);
        });
      }
    }
  }
  saveOrUpdate() {
    switch (this.customertabs.activeId) {
      case '1':
        this.saveOrUpdateBusiness();
        break;
      case '2':
        this.paymentComponent.addpayment();
        break;
      case '3':
        this.branchComponent.newBranch();
        break;
      case '4':
        this.settingsComponent.updateSettings(this.customerObj);
        break;
      case '5':
        this.gigComponent.addgig();
        break;
      case '6':
        this.couponComponent.addCoupon();
        break;
      case '7':
        if (this.galleryComponent.displayImgList.length > 0) {
          this.galleryComponent.saveOrUpdateGalleries();
        }
    }
  }
  onCustomerTabChange(event) {
    this.customerObj = this.customerObj;
    this.generateEditForm();
    if (event.nextId === '9' || event.nextId === '8' || event.nextId === '6' || event.nextId === '5' || event.nextId === '3' || event.nextId === '2') {
      this.showbutton = false;
      this.hidebutton = true
      if (event.nextId === '6') {
        this.tooltipmessage = AppConstant.MESSAGE.COUPON;
        return false;
      }
      if (event.nextId === '2') {
        if (this.userstoragedata.roleid !== 1) {
          this.hidebutton = false;
        }
        this.tooltipmessage = AppConstant.MESSAGE.PAYMENTS;
        return false;
      }
      if (event.nextId === '3') {
        this.tooltipmessage = AppConstant.MESSAGE.BRANCHES;
        return false;
      }
      if (event.nextId === '5') {
        this.tooltipmessage = AppConstant.MESSAGE.GIGS;
        return false;
      }
      if (event.nextId === '8') {
        this.hidebutton = false;
        this.showbutton = false;
        return false;
      }
      if (event.nextId === '9') {
        this.hidebutton = false;
        this.showbutton = false;
        return false;
      }
    } else {
      this.showbutton = true;
      this.hidebutton = false;
    }
  }

  generateEditForm() {
    this.customerObj.categoryid = this.customerObj.categoryid.toString();
    this.customerObj.locationid = this.customerObj.locationid.toString();
    this.customerObj.regdate = this.commonService.parseDate(this.customerObj.regdate);
    this.customerObj.starttime = this.customerObj.workhours.starttime;
    this.customerObj.endtime = this.customerObj.workhours.endtime;
    if (this.customerObj.parentmembershipid != null) {
      this.branchFlag = true;
    }
    this.customerObj.contactmobile = this.customerObj.contactmobile[0];
    this.customerObj.phoneno = _.map(this.customerObj.phoneno, function (item) {
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
    this.customerObj.inmallyn = this.customerObj.inmallyn === 'Y' ? true : false;
    this.customerObj.status = (this.customerObj.status === AppConstant.STATUS_ACTIVE ? true : false);
    if (this.customerObj.socialids != null) {
      this.socialidForm.patchValue(this.customerObj.socialids);
      let socialids = '';
      _.map(this.customerObj.socialids, function (value, key) {
        if (value != null && value != '') {
          socialids = socialids + value + ',';
        }
      });
      this.customerObj.socialids = socialids;
    }
    // let paymentObj = {} as any;
    // const self = this;
    // paymentObj = _.find(this.paymentTenuresList, function (item) {
    //   console.log(self.customerObj.paymenttenure);
    //   console.log(item.planid);
    //   if (item.planid == Number(self.customerObj.paymenttenure)) {
    //     return item;
    //   }
    // });
    // console.log(paymentObj);
    // console.log(this.customerObj);
    // if (!_.isUndefined(paymentObj)) {
    //   this.customerObj.paymenttenureid = paymentObj.planid.toString();
    //   this.customerObj.paymenttenure = paymentObj.planname;
    // }
    this.customerForm.patchValue(this.customerObj);
    if (this.customerForm.get('membershiptype').value !== AppConstant.MEM_TYPE) {
      this.customerForm.get('paymenttenure').setValidators(Validators.required);
      this.customerForm.get('paymentstatus').setValidators(Validators.required);
      this.customerForm.get('paymentstatus').updateValueAndValidity();
      // this.customerForm.get('paymenttenure').updateValueAndValidity();
    }
    this.buttonText = AppConstant.BUTTON_TXT.UPDATE;
    this.mallsList = [];
    this.lookupList.forEach(element => {
      if (element.refname === this.customerObj.city) {
        this.mallsList.push(element);
      }
    });
  }

  // map starts
  private loadMap() {
    return new Promise((resolve, reject) => {
      this.mapService.load('googlemaps').then(suc => {
        resolve(true);
      }).catch(error => {
        reject(false);
      });
    });
  }

  openmap() {
    this.loadMap().then(() => {
      let data = this.customerForm.value;
      let a = this;
      let w: any = window;
      let gmap = w.google.maps;
      let markers = [];
      let Curloc;
      let map;
      // Creating Search field.
      let location = document.getElementById('controls');
      let pac_input = document.createElement('input');
      pac_input.setAttribute('id', 'pac-input');
      pac_input.setAttribute('class', 'controls');
      pac_input.setAttribute('type', 'text');
      pac_input.setAttribute('placeholder', 'Search here');
      pac_input.setAttribute('autocomplete', 'on');
      location.appendChild(pac_input);
      if (data.latitude && data.longitude !== null) {
        Curloc = { lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) };
      } else {
        Curloc = { lat: 13.082680, lng: 80.270721 };
      }
      map = new gmap.Map(document.getElementById('map'), {
        center: Curloc,
        zoom: 12,
        mapTypeControl: false,
        fullscreenControl: false,
        mapTypeId: 'roadmap'
      });
      var marker = new gmap.Marker({ position: Curloc, map: map, draggable: true });
      gmap.event.addListener(marker, 'dragend', function () {
        a.customerlat = marker.getPosition().lat();
        a.customerlng = marker.getPosition().lng();
      });
      markers.push(marker);
      this.openModal('mapmodal');
      a.createAutoCompleteSearchBox(gmap, a, markers, map);
    }).catch(err => {
      alert('Unable to load map');
    });
  }

  createAutoCompleteSearchBox(gmap, a, markers, map) {
    let s_input = document.getElementById('pac-input');
    var searchBox = new gmap.places.SearchBox(s_input);
    map.controls[gmap.ControlPosition.TOP_LEFT].push(s_input);
    map.addListener('bounds_changed', function () {
      searchBox.setBounds(map.getBounds());
    });
    searchBox.addListener('places_changed', function () {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      markers.forEach(function (marker) {
        marker.setMap(null);
      });
      markers = [];
      var bounds = new gmap.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry) {
          return;
        }
        var marker = new gmap.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location,
          draggable: true
        });

        gmap.event.addListener(marker, 'dragend', function () {
          a.customerlat = marker.getPosition().lat();
          a.customerlng = marker.getPosition().lng();
        });
        markers.push(marker);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
  setlocation() {
    this.customerForm.patchValue({
      latitude: this.customerlat,
      longitude: this.customerlng
    });
    this.closeModal('mapmodal');
  }
  // map ends

  onMembershipChange(event) {
    if (event.refvalue === AppConstant.MEM_TYPE) {
      this.customerForm.get('paymenttenure').clearValidators();
      this.customerForm.get('paymentstatus').clearValidators();
      this.customerForm.get('paymentstatus').updateValueAndValidity();
      this.customerForm.get('paymenttenure').updateValueAndValidity();
    } else {
      this.customerForm.get('paymenttenure').setValue('');
      this.customerForm.get('paymentstatus').setValue('');
      this.customerForm.get('paymenttenure').setValidators(Validators.required);
      this.customerForm.get('paymentstatus').setValidators(Validators.required);
      this.customerForm.get('paymentstatus').updateValueAndValidity();
      this.customerForm.get('paymenttenure').updateValueAndValidity();
    }
  }
  editfancyno() {
    this.openModal('fancynomodal');
    this.getOwnedFancyNos(this.customerObj.membershipid);
  }
  getOwnedFancyNos(id) {
    this.fancynumberService.getList({ membershipid: parseInt(id) }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.ownedNos = _.map(response.data, (o) => {
          return { label: o.fancyno, value: o.fancyid }
        });
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
      this.getfancycode();
    });
  }
  getfancycode() {
    let self = this;
    let memcode: any;
    memcode = _.find(this.ownedNos, function (item) {
      if (item.label == self.customerObj.membershipcode) {
        return item;
      }
    });
    this.memCode = [memcode.value];
  }
  allocateFancyNos(param?, mid?) {
    let data = {
      membershipid: mid,
      membershipcode: param.label,
      updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname,
      fancyid: param.value
    };
    this.fancynumberService.updateallocation(data).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.bootstrapAlertService.showSucccess(response.message);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
}
