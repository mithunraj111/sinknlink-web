import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppConstant } from '../../../../app.constants';
import { CustomerService } from 'src/app/services/business/customer.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class DealerCustomersComponent implements OnChanges, OnInit {
  public dealerCustomers: any = [];
  @ViewChild(DatatableComponent) customertable: DatatableComponent;
  @Input() dealerid = {} as any;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  constructor(private customerService: CustomerService) {


  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getCustomers(changes.dealerid.currentValue);
  }
  getCustomers(dealerid) {
    if (dealerid != undefined) {
      this.customerService.list({ dealerid: Number(dealerid) }).subscribe((res) => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.dealerCustomers = response.data;
        }
      });
    }
  }
}
