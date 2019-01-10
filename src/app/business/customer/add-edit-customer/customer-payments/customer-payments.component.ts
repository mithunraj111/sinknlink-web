import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';

@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.component.html',
  styleUrls: ['./customer-payments.component.scss']
})
export class CustomerPaymentsComponent implements OnInit {
  data: any[];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  date: any;
  newPayment = true;
  viewPayment = true;
  constructor() {
    this.data = [
      { amount: '10000', reference: '001', mode: 'NEFT', paiddt: '02/12/2018',status:'Failed' },
      { amount: '20000', reference: '002', mode: 'NEFT', paiddt: '20/12/2018',status:'Failed' },
      { amount: '120000', reference: '003', mode: 'NEFT', paiddt: '26/12/2018',status:'Credit' },
      { amount: '4000', reference: '004', mode: 'NEFT', paiddt: '23/12/2018',status:'Credit' },
      { amount: '9500', reference: '005', mode: 'NEFT', paiddt: '07/12/2018' ,status:'Credit'}
    ];
    this.tempFilter = this.data;
    this.date = new Date();
  }

  ngOnInit() {
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
    this.data = temp;
    this.table.offset = 0;
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  viewpayment() {
    this.openMyModal('customerpaymentmodal');
    this.newPayment = false;
    this.viewPayment = true;
  }
  addpayment() {
    this.openMyModal('customerpaymentmodal');
    this.newPayment = true;
    this.viewPayment= false;
  }
  viewDonationCause() {
    this.openMyModal('donationCauseModal');
  }
  getRowHeight(row) {
    return row.height;
  }
}
