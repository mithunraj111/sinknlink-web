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
import { CustomerGalleryComponent } from './customer-gallery/customer-gallery.component';
import { MapService } from '../../../services/map.service';

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
  customerForm: FormGroup;
  socailIdForm: FormGroup;
  formTitle: string;
  buttonText = AppConstant.BUTTON_TXT.SAVE;
  savecustomer;
  workDays = AppConstant.WORKDAYS;
  @ViewChild(CustomerCouponsComponent) couponComponent: CustomerCouponsComponent;
  @ViewChild(CustomerGigsComponent) gigComponent: CustomerGigsComponent;
  @ViewChild(CustomerSettingsComponent) settingsComponent: CustomerSettingsComponent;
  @ViewChild(CustomerGalleryComponent) galleryComponent: CustomerGalleryComponent;
  @ViewChild('customertabs') customertabs: NgbTabset;
  paymentMethods = [];
  categoryList = [];
  memberTypes = [];
  businesstypes = [];
  deliveryMethods = [];
  locationList = [];
  mallsList = [];
  paymentTenures = AppConstant.PAYMENT_TENURES;
  paymentStatus = AppConstant.PAYMENT_STATUS;
  customerid;
  userstoragedata = {} as any;
  customerErrObj = AppMessages.VALIDATION.BUSINESS;
  customerObj = {} as any;
  branchFlag = false;
  parentid;
  customerlat: any;
  customerlng: any;
  isAddForm = true;
  constructor(private fb: FormBuilder,
    private categoryService: MasterService.CategoryService,
    private lookupService: AdminService.LookupService,
    private commonService: CommonService,
    private localStorageService: LocalStorageService,
    private customerService: BusinessService.CustomerService,
    private bootstrapAlertService: BootstrapAlertService,
    private locationService: MasterService.LocationService,
    private route: ActivatedRoute,
    private mapService: MapService

  ) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.customerid = params.id;
        this.getCustomerDetail();
        this.isAddForm = false;
      }
      if (params.flag !== undefined) {
        this.branchFlag = true;
        this.parentid = params.parentid;
      }
    });
  }

  ngOnInit() {
    this.initForm();
    this.getLookUps();
    this.getCategoryList();
    this.getLocationList();
    this.loadMap();
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
          this.mallsList = _.get(groupedData, 'biz_malls');
        }
        if (this.customerid == null) {
          let selectedMemberType = [];
          _.each(this.memberTypes, function (item) {
            if (item.isdefault == 'Y') {
              selectedMemberType.push(item.refvalue);
            }
          });
          let selectedBusinessType = [];
          _.each(this.businesstypes, function (item) {
            if (item.isdefault == 'Y') {
              selectedBusinessType.push(item.refvalue);
            }
          });
          let selectedPaymentMethods = [];
          _.each(this.paymentMethods, function (item) {
            if (item.isdefault == 'Y') {
              selectedPaymentMethods.push(item.refvalue);
            }
          });
          let selectedDeliveryOpts = [];
          _.each(this.deliveryMethods, function (item) {
            if (item.isdefault == 'Y') {
              selectedDeliveryOpts.push(item.refvalue);
            }
          });
          this.customerForm.controls['membershiptype'].setValue(selectedMemberType);
          this.customerForm.controls['biztype'].setValue(selectedBusinessType);
          this.customerForm.controls['acceptedpayments'].setValue(selectedPaymentMethods);
          this.customerForm.controls['deliveryoptions'].setValue(selectedDeliveryOpts);
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
      bizdesc: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(100)])],
      contactperson: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      contactmobile: [null, Validators.required],
      contactemail: ['', Validators.compose([Validators.pattern(AppConstant.REGEX.EMAIL), Validators.maxLength(100)])],
      phoneno: [[]],
      categoryid: [null, Validators.required],
      tags: [[], Validators.required],
      postaladdress: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(100)])],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      locationid: [null, Validators.required],
      workdays: [null, Validators.required],
      starttime: [null, Validators.required],
      endtime: [null, Validators.required],
      acceptedpayments: [null, Validators.required],
      deliveryoptions: [null, Validators.required],
      socialids: [[]],
      taxno: [null, Validators.compose([Validators.required, Validators.maxLength(30)])],
      website: ['', Validators.compose([Validators.maxLength(200), Validators.pattern(AppConstant.REGEX.WEBSITE)])],
      regdate: [this.commonService.getCurrentDate('Y'), Validators.required],
      paymentstatus: [null, Validators.required],
      membershiptype: [null, Validators.required],
      paymenttenure: [null, Validators.required],
      status: [true, Validators.required],
      tncagreed: [false, Validators.required],
      landmark: ['', Validators.maxLength(200)],
      inmallyn: [false],
      mallname: ['']
    });
    this.socailIdForm = this.fb.group({
      fb: [''],
      gmail: [''],
      twitter: [''],
      instagram: [''],
    });
    this.buttonText = AppConstant.BUTTON_TXT.SAVE;
  }

  addSocialId() {
    this.openModal('socialidmodal');
  }
  openModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeModal(event) {
    document.querySelector('#' + event).classList.remove('md-show');
  }
  update() {
    let socialids = '';
    const self = this;
    _.map(this.socailIdForm.value, function (value, key) {
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
      this.savecustomer = true;
      const data = this.customerForm.value;
      const formdata = { ...data } as any;
      if (this.branchFlag) {
        formdata.parentmembershipid = Number(this.parentid);
      }
      formdata.workhours = data.starttime + '-' + data.endtime;
      formdata.locationid = Number(data.locationid);
      formdata.categoryid = Number(data.categoryid);
      formdata.latitude = Number(data.latitude);
      formdata.longitude = Number(data.longitude);
      formdata.regdate = this.commonService.formatDate(data.regdate);
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
      formdata.contactmobile = _.map(data.contactmobile, _.property('value'));
      formdata.phoneno = _.map(data.phoneno, _.property('value'));
      formdata.tags = _.map(data.tags, _.property('value'));
      formdata.tncagreed = data.tncagreed ? 'Y' : 'N';
      formdata.inmallyn = data.inmallyn ? 'Y' : 'N';
      if (formdata.inmallyn === 'Y') {
        formdata.mallname = formdata.mallname;
      }
      formdata.socialids = this.socailIdForm.value;
      formdata.workhours = {
        starttime: data.starttime,
        endtime: data.endtime
      };
      formdata.geoaddress = {
        lat: data.latitude,
        lng: data.longitude
      };

      if (this.userstoragedata.usertype === 'D') {
        formdata.dealerid = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.DEALER).dealerid;
      }
      formdata.locationobj = JSON.stringify(_.find(this.locationList, { locationid: formdata.locationid }));
      formdata.businessobj = JSON.stringify(formdata);
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
            this.savecustomer = false;
            this.customerObj = response.data;
            this.isAddForm = false;
            this.bootstrapAlertService.showSucccess(response.message);
          } else {
            this.savecustomer = false;
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.savecustomer = false;
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
        } else {
          this.bootstrapAlertService.showError(AppMessages.VALIDATION.GIG.common);
          return false;
        }
        break;
      case '6':
        if (this.couponComponent.couponForm.touched) {
          this.couponComponent.saveOrUpdateCoupon();
        } else {
          this.bootstrapAlertService.showError(AppMessages.VALIDATION.COUPON.common);
          return false;
        }
        break;
      case '7':
        if (this.galleryComponent.displayImgList.length > 0) {
          this.galleryComponent.saveOrUpdateGalleries();
        }
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
      this.socailIdForm.patchValue(this.customerObj.socialids);
      let socialids = '';
      _.map(this.customerObj.socialids, function (value, key) {
        if (value != null && value != '') {
          socialids = socialids + value + ',';
        }
      });
      this.customerObj.socialids = socialids;
    }
    this.customerForm.patchValue(this.customerObj);
    this.buttonText = AppConstant.BUTTON_TXT.UPDATE;
  }

  //map starts 


  private loadMap() {

    this.mapService.load('googlemaps').catch(error => { console.log(error); console.log('Inside err') });

  }

  openmap() {

    var data = this.customerForm.value;
    var w: any = window;
    var userLocation = this;
    
    if (data.latitude && data.longitude !== null) {
      var Curloc = { lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) }
    }
    else {
      var Curloc = { lat: 11.0805951, lng: 76.9425555 }
    }

    var gmap = w.google.maps;
    var map = new gmap.Map(document.getElementById("map"), {
      center: Curloc,
      zoom: 12
    });

    var input = document.getElementById('pac-input'); 

    var marker = new gmap.Marker({ position: Curloc, map: map, draggable: true })
    gmap.event.addListener(marker, 'dragend', function () {
      userLocation.customerlat = marker.getPosition().lat();
      userLocation.customerlng = marker.getPosition().lng();
    });
    this.openModal('mapmodal');
  }

  setlocation() {
    this.customerForm.patchValue({
      latitude: this.customerlat,
      longitude: this.customerlng
    });
    this.closeModal('mapmodal');
  }

}


// map ends
