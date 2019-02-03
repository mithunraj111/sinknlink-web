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
import * as _ from 'lodash';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
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
  formTitle: string;
  buttonText = AppConstant.BUTTON_TXT.SAVE;
  socialidPage: boolean;
  socialiddtls: {};
  workDays = AppConstant.WORKDAYS;
  @ViewChild(CustomerCouponsComponent) couponComponent: CustomerCouponsComponent;
  @ViewChild(CustomerGigsComponent) gigComponent: CustomerGigsComponent;
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
  customerErrObj = {} as any;
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
      bizname: [null, Validators.compose([])],
      biztype: [null, Validators.compose([])],
      contactperson: [null, Validators.compose([])],
      contactmobile: [null, Validators.compose([])],
      contactemail: [null, Validators.compose([])],
      phoneno: [null, Validators.compose([])],
      categoryid: [null, Validators.compose([])],
      tags: [null, Validators.compose([])],
      postaladdress: [null, Validators.compose([])],
      latitude: [null, Validators.compose([])],
      longitude: [null, Validators.compose([])],
      locationid: [null, Validators.compose([])],
      workdays: [null, Validators.compose([])],
      starttime: [null, Validators.compose([])],
      endtime: [null, Validators.compose([])],
      acceptedpayments: [null, Validators.compose([])],
      deliveryoptions: [null, Validators.compose([])],
      taxno: [null, Validators.compose([])],
      website: [null, Validators.compose([])],
      regdate: [null, Validators.compose([])],
      paymentstatus: [null, Validators.compose([])],
      membershiptype: [null, Validators.compose([])],
      paymenttenure: [null, Validators.compose([])],
      status: [true, Validators.compose([])],
      tncagreed: [null, Validators.compose([])]
    });
    this.buttonText = AppConstant.BUTTON_TXT.SAVE;
  }
  addSocialId() {
    this.socialiddtls = {};
    this.formTitle = 'Add Social Id';
    this.openSocialIdModal('socialidmodal');
    this.socialidPage = false;
  }
  editSocialId(data) {
    this.socialiddtls = data;
    this.formTitle = 'Edit Social Id';
    this.openSocialIdModal('socialidmodal');
    this.socialidPage = true;
  }
  openSocialIdModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeSocialIdModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
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
      formdata.workhours = data.starttime + '-' + data.endtime;
      formdata.locationid = Number(data.locationid);
      formdata.categoryid = Number(data.categoryid);
      formdata.regdate = this.commonService.formatDate(data.regdate);
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
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
      case '5':
        if (this.gigComponent.gigForm.touched) {
          this.gigComponent.saveOrUpdateGig();
        }
        break;
      case '6':
        if (this.couponComponent.couponForm.touched) {
          this.couponComponent.saveOrUpdateCoupon();
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
    this.customerObj.status = (this.customerObj.status === AppConstant.STATUS_ACTIVE ? true : false);
    this.customerForm.patchValue(this.customerObj);
    this.buttonText = AppConstant.BUTTON_TXT.UPDATE;
  }
}
