import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-dealer-payments',
  templateUrl: './dealer-payments.component.html',
  styleUrls: ['./dealer-payments.component.scss']
})
export class DealerPaymentsComponent implements OnInit {
  public data: any;
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {
    this.data = [
      { paymentdate: '02-Dec-2018', amount: '1000', mode: 'Cheque', remarks: 'No remarks' },
      { paymentdate: '02-Dec-2018', amount: '5000', mode: 'Cheque', remarks: 'No remarks' },
      { paymentdate: '02-Dec-2018', amount: '1000', mode: 'Cheque', remarks: 'No remarks' },
      { paymentdate: '02-Dec-2018', amount: '4000', mode: 'Cash', remarks: 'No remarks' },
      { paymentdate: '02-Dec-2018', amount: '5000', mode: 'Cash', remarks: 'No remarks' },
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
}
