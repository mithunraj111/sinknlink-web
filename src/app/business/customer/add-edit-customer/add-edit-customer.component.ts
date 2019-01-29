import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/app.constants';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { fadeInOutTranslate } from '../../../../assets/animations/fadeInOutTranslate';

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
  isaddForm = true;
  customerid: number;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  formTitle: string;
  formSubmit: string;
  socialidPage: boolean;
  socialiddtls: {};
  customerDetails = true;
  paymentDetails = false;
  branchDetails = false;
  gigsSection = false;
  data: any[];
  gigsdata: any[];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  activeTab: string = 'details';

  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.data = [
      { name: 'Mithun', memberid: '001', location: 'Chennai', payment: '10000', duedate: '02/12/2018' },
      { name: 'Raj', memberid: '002', location: 'Coimbatore', payment: '5000', duedate: '20/12/2018' },
      { name: 'Mithunraj', memberid: '003', location: 'Madurai', payment: '8000', duedate: '26/12/2018' },
      { name: 'Myth', memberid: '004', location: 'velore', payment: '7600', duedate: '23/12/2018' },
      { name: 'Glaurang', memberid: '005', location: 'Tanjore', payment: '9800', duedate: '07/12/2018' }
    ];
    this.gigsdata = [
      { postname: 'Mithun', posttype: '001', postedby: 'Admin', posteddt: '02/12/2018' },
      { postname: 'Raj', posttype: '002', postedby: 'Admin', posteddt: '20/12/2018' },
      { postname: 'Mithunraj', posttype: '003', postedby: 'Admin', posteddt: '26/12/2018' },
      { postname: 'Myth', posttype: '004', postedby: 'Admin', posteddt: '23/12/2018' },
      { postname: 'Glaurang', posttype: '005', postedby: 'Admin', posteddt: '07/12/2018' }
    ];
    this.tempFilter = this.gigsdata;
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.customerid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
      }
    });
  }

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
  navigateTo(activeTab) {
    this.activeTab = activeTab;
  }
  search(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempFilter.filter(item => {
      for (let key in item) {
        if (("" + item[key]).toLocaleLowerCase().includes(val)) {
          return ("" + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.gigsdata = temp;
    this.table.offset = 0;
  }
}
