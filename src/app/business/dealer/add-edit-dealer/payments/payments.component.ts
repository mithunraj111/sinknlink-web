import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { PaymentsService } from 'src/app/services/common/payments.service';

@Component({
  selector: 'app-dealer-payments',
  templateUrl: './payments.component.html'
})
export class DealerPaymentsComponent implements OnChanges, OnInit {
  dealerPayments = [];
  paymentDetail = {} as any;
  tempFilter = [];
  @Input() dealerid = {} as any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  constructor(private paymentService: PaymentsService) {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getPayments(changes.dealerid.currentValue);
  }
  getPayments(dealerid) {
    if (dealerid != undefined) {
      this.paymentService.list({ dealerid: Number(dealerid) }).subscribe((res) => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.dealerPayments = response.data;
          this.tempFilter = this.dealerPayments;

        }
      });
    }
  }
  openPaymentModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  close(event) {
    document.querySelector('#' + event).classList.remove('md-show');
  }
  viewPayment(data) {
    this.paymentDetail = data;
    console.log(this.paymentDetail);
    this.openPaymentModal('paymentDetailModal');
  }
  search(event?) {
    let val = '';
    if( event != null && event != undefined ){
      val = event.target.value.toLowerCase();
    }
    const temp = this.tempFilter.filter(item => {
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.dealerPayments = temp;
    this.table.offset = 0;
  }
}
