import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { CommonService, AppCommonService } from '../../../../services';

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
  emptymessages = AppConstant.EMPTY_MESSAGES.DEALER_PAYMENT;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  constructor(private paymentService: AppCommonService.PaymentsService,
    private commonService: CommonService) {
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
    this.openPaymentModal('paymentDetailModal');
  }
  search(event?) {
    this.dealerPayments = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
}
