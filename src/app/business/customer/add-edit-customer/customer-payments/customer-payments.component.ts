import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.component.html',
  styleUrls: ['./customer-payments.component.scss']
})
export class CustomerPaymentsComponent implements OnInit {
  data: any[];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  
  constructor() { 
    this.data=[
      { amount: '10000', reference: '001', mode: 'NEFT', paiddt: '02/12/2018' },
      { amount: '20000', reference: '002', mode: 'NEFT', paiddt: '20/12/2018' },
      { amount: '120000', reference: '003', mode: 'NEFT', paiddt: '26/12/2018' },
      { amount: '4000', reference: '004', mode: 'NEFT', paiddt: '23/12/2018' },
      { amount: '9500', reference: '005', mode: 'NEFT', paiddt: '07/12/2018' }
    ];
    this.tempFilter = this.data;
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
  viewpayment(){
    this.openMyModal('customerpaymentmodal');
  }
  viewDonationCause(){
    this.openMyModal('donationCauseModal');
  }
}
