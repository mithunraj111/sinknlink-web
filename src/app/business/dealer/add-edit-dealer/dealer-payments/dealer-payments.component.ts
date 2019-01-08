import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';

@Component({
  selector: 'app-dealer-payments',
  templateUrl: './dealer-payments.component.html',
  styleUrls: ['./dealer-payments.component.scss']
})
export class DealerPaymentsComponent implements OnInit {
  public data: any;
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  date: any;
  constructor() {
    this.data = [
      { paymentdate: '02-Dec-2018', amount: '1000', mode: 'Cheque', remarks: 'No remarks', status: 'Failed' },
      { paymentdate: '02-Dec-2018', amount: '5000', mode: 'Cheque', remarks: 'No remarks', status: 'Failed' },
      { paymentdate: '02-Dec-2018', amount: '1000', mode: 'Cheque', remarks: 'No remarks', status: 'Failed' },
      { paymentdate: '02-Dec-2018', amount: '4000', mode: 'Cash', remarks: 'No remarks', status: 'Failed' },
      { paymentdate: '02-Dec-2018', amount: '5000', mode: 'Cash', remarks: 'No remarks', status: 'Failed' },
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
}
