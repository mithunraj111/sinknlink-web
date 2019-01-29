import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { LocalStorageService } from '../../services/local-storage.service';
import { DealerService } from 'src/app/services/business/dealer.service';


@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss']
})
export class DealerComponent implements OnInit {

  dealerList = [];
  tempFilter = [];
  buttontext: string;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  userstoragedata = {} as any;
  constructor(private router: Router,
    private dealerService: DealerService,
    private bootstrapAlertService: BootstrapAlertService,
    private localStorageService: LocalStorageService) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);

  }

  ngOnInit() {
    this.getDealersList();
  }
  getDealersList() {
    this.dealerService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.dealerList = response.data;
        this.tempFilter = this.dealerList;
      }
    });
  }

  addDealer() {
    this.router.navigate(['business/dealer/create']);
  }
  editDealer(id) {
    this.router.navigate(['business/dealer/edit/' + id]);
  }
  search(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempFilter.filter(item => {
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.dealerList = temp;
    this.table.offset = 0;
  }
}
