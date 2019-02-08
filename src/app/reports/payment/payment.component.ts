import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class PaymentComponent implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  paymentList = [
    {
      paymentref: 'cash', paymentdt: '06-Feb-2019 04.25', totalamount: '₹2,450.00', paymenttype: 'credit card', paymentmode: 'card'
    },
    {
      paymentref: 'cash', paymentdt: '06-Feb-2019 04.25', totalamount: '₹2,450.00', paymenttype: 'credit card', paymentmode: 'card'
    },
    {
      paymentref: 'cash', paymentdt: '06-Feb-2019 04.30', totalamount: '₹2,450.00', paymenttype: 'credit card', paymentmode: 'card'
    },
    {
      paymentref: 'cash', paymentdt: '06-Feb-2019 04.35', totalamount: '₹2,450.00', paymenttype: 'credit card', paymentmode: 'card'
    },
    {
      paymentref: 'cash', paymentdt: '06-Feb-2019 04.40', totalamount: '₹2,450.00', paymenttype: 'credit card', paymentmode: 'card'
    },
    {
      paymentref: 'cash', paymentdt: '06-Feb-2019 04.20', totalamount: '₹2,450.00', paymenttype: 'credit card', paymentmode: 'card'
    },
    {
      paymentref: 'cash', paymentdt: '06-Feb-2019 04.45', totalamount: '₹2,450.00', paymenttype: 'credit card', paymentmode: 'card'
    }
  ];
  tempFilter = [];
  constructor() {
    this.tempFilter = this.paymentList;
  }

  ngOnInit() {
  }
  search(event?) {
    let val = '';
    if (event != null && event != undefined) {
      val = event.target.value.toLowerCase();
    }
    const temp = this.tempFilter.filter(item => {
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.paymentList = temp;
    this.table.offset = 0;
  }

  getPayment() { }
}
