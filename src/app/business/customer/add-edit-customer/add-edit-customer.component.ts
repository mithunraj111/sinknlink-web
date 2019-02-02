import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/app.constants';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { NgbDateParserFormatter, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOutTranslate } from '../../../../assets/animations/fadeInOutTranslate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService, CommonService, LocalStorageService, AdminService } from '../../../services';
import { CustomerCouponsComponent } from './customer-coupons/customer-coupons.component';
import { CustomerGigsComponent } from './customer-gigs/customer-gigs.component';
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
  customerprofile: FormGroup;
  formTitle: string;
  buttonText: 'Save';
  socialidPage: boolean;
  socialiddtls: {};
  workDays = AppConstant.WORKDAYS;
  @ViewChild(CustomerCouponsComponent) couponComponent: CustomerCouponsComponent;
  @ViewChild(CustomerGigsComponent) gigComponent: CustomerGigsComponent;
  @ViewChild('customertabs') customertabs: NgbTabset;
  paymentMethods = [
    { value: 'NEFT', label: 'NEFT' },
    { value: 'Card', label: 'Card' },
    { value: 'Cheque', label: 'Cheque' },
  ];
  categoryList = [];
  lookupList = [];
  customerid;
  constructor(private fb: FormBuilder, private categoryService: MasterService.CategoryService,
    private lookupService: AdminService.LookupService) { }

  ngOnInit() {
    this.initForm();
    this.getLookUps();
    this.getCategoryList();
  }
  getLookUps() {
    this.lookupService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.lookupList = response.data;
      }
    });
  }
  getCategoryList() {
    this.categoryService.list({ status: AppConstant.STATUS_ACTIVE }, '').subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.value = item.categoryid.toString();
          item.name = item.categoryname;
        });
        this.categoryList = response.data;
      }
    });
  }
  initForm() {
    this.customerprofile = this.fb.group({
      businessname: [null, Validators.compose([])],
      businesstype: [null, Validators.compose([])],
      contactperson: [null, Validators.compose([])],
      mobileno: [null, Validators.compose([])],
      email: [null, Validators.compose([])],
      phoneno: [null, Validators.compose([])],
      category: [null, Validators.compose([])],
      subcategory: [null, Validators.compose([])],
      address: [null, Validators.compose([])],
      latitude: [null, Validators.compose([])],
      longitude: [null, Validators.compose([])],
      location: [null, Validators.compose([])],
      workdays: [null, Validators.compose([])],
      starttime: [null, Validators.compose([])],
      endtime: [null, Validators.compose([])],
      paymentmethods: [null, Validators.compose([])],
      deliverymethods: [null, Validators.compose([])],
      taxno: [null, Validators.compose([])],
      website: [null, Validators.compose([])],
      registrationdate: [null, Validators.compose([])],
      paymentstatus: [null, Validators.compose([])],
      membertype: [null, Validators.compose([])],
      paymenttenure: [null, Validators.compose([])],
      customerstatus: [null, Validators.compose([])],
      termsandcond: [null, Validators.compose([])]
    });
    this.buttonText = 'Save';
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

  saveOrUpdate() {
    if (this.customertabs.activeId === '5') {
      if (this.gigComponent.gigForm.touched) {
        this.gigComponent.saveOrUpdateGig();
      }
    }
    if (this.customertabs.activeId === '6') {
      if (this.couponComponent.couponForm.touched) {
        this.couponComponent.saveOrUpdateCoupon();
      }
    }
  }
  onTabChange(event) {

  }
}
