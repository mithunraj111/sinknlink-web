import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-business-details',
  templateUrl: './customer-business-details.component.html',
  styleUrls: ['./customer-business-details.component.scss']
})
export class CustomerBusinessDetailsComponent implements OnInit {
  formTitle: string;
  formSubmit: string;
  socialidPage: boolean;
  socialiddtls: {};

  constructor() { }

  ngOnInit() {
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
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
