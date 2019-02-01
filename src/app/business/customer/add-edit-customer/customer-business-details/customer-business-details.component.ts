import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-business-details',
  templateUrl: './customer-business-details.component.html',
  styleUrls: ['./customer-business-details.component.scss']
})
export class CustomerBusinessDetailsComponent implements OnInit {
  customerprofile: FormGroup;
  formTitle: string;
  formSubmit: string;
  socialidPage: boolean;
  socialiddtls: {};
  workDays = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ];
  paymentMethods = [
    { value: 'NEFT', label: 'NEFT' },
    { value: 'Card', label: 'Card' },
    { value: 'Cheque', label: 'Cheque' },
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.customerprofile = this.fb.group({
      businessname : [null, Validators.compose([])],
      businesstype : [null, Validators.compose([])],
      contactperson : [null, Validators.compose([])],
      mobileno : [null, Validators.compose([])],
      email : [null, Validators.compose([])],
      phoneno : [null, Validators.compose([])],
      category : [null, Validators.compose([])],
      subcategory : [null, Validators.compose([])],
      address : [null, Validators.compose([])],
      latitude : [null, Validators.compose([])],
      longitude : [null, Validators.compose([])],
      location : [null, Validators.compose([])],
      workdays : [null, Validators.compose([])],
      starttime : [null, Validators.compose([])],
      endtime : [null, Validators.compose([])],
      paymentmethods : [null, Validators.compose([])],
      deliverymethod : [null, Validators.compose([])],
      taxno : [null, Validators.compose([])],
      website : [null, Validators.compose([])],
      registrationdate : [null, Validators.compose([])],
      paymentstatus : [null, Validators.compose([])],
      membertype : [null, Validators.compose([])],
      paymenttenure : [null, Validators.compose([])],
      customerstatus : [null, Validators.compose([])],
      termsandcond : [null, Validators.compose([])]
    })
  }
  addSocialId() {
    this.socialiddtls = {};
    this.formTitle = 'Add Social Id';
    this.formSubmit = 'Save';
    this.openMyModal('socialidmodal');
    this.socialidPage = false;
  }
  editSocialId(data) {
    this.socialiddtls = data;
    this.formTitle = 'Edit Social Id';
    this.formSubmit = 'Update';
    this.openMyModal('socialidmodal');
    this.socialidPage = true;
  }
  openMap() {
    this.openMyModal('mapmodal');
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
