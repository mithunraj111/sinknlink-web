import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/app.constants';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOutTranslate } from '../../../../assets/animations/fadeInOutTranslate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  paymentMethods = [
    { value: 'NEFT', label: 'NEFT' },
    { value: 'Card', label: 'Card' },
    { value: 'Cheque', label: 'Cheque' },
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
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
      deliverymethod: [null, Validators.compose([])],
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
}
