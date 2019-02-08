import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { ConsumerService } from '../../services/business/consumer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {
  consumersList: any[] = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  displaydtimeformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  constructor(private router: Router,
    private consumerService: ConsumerService,
    private bootstrapAlertService: BootstrapAlertService,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.getConsumers();
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
    this.consumersList = temp;
    this.table.offset = 0;
  }
  getConsumers() {
    this.consumerService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.consumersList = response.data;
        this.tempFilter = this.consumersList;
      }
    });
  }
  updateConsumer(pk, status, isDeleted?) {
    const data = {
      consumerid: pk,
      status: isDeleted == true ?
        AppConstant.STATUS_DELETED : status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE,
      updateddt: new Date(),
      updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
    };
    this.consumerService.update(data, pk).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.getConsumers(); this.bootstrapAlertService.showSucccess(response.message);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
      console.log(err);
    });
  }
  viewCustomer(id) {
    this.router.navigate(['business/consumers/view/' + id]);
  }
  getRowHeight(row) {
    return row.height;
  }
}
