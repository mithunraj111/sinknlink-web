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
        }
      });
    }

  }

}
