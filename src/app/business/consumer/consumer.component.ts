import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { CommonService, BaseService, BusinessService } from '../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent extends BaseService implements OnInit {
  consumersList: any[] = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  emptymessages = AppConstant.EMPTY_MESSAGES.CONSUMERS;
  loadingIndicator = true;

  displaydtimeformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  constructor(private router: Router,
    private commonService: CommonService,
    private consumerService: BusinessService.ConsumerService,
    private bootstrapAlertService: BootstrapAlertService) {
    super();
    this.getScreenDetails('b_consumers');
  }

  ngOnInit() {
    this.getConsumers();
  }
  search(event?) {
    this.consumersList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
  getConsumers() {
    this.loadingIndicator = true;
    this.consumerService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.consumersList = response.data;
        this.tempFilter = this.consumersList;
      }
    });
  }
  updateConsumer(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };

    if (flag) {
      this.consumerService.delete(updateObj, data.consumerid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess('#' + data.consumerid + ' ' + response.message);
          this.consumersList.splice(index, 1);
          this.consumersList = [...this.consumersList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    } else {
      this.consumerService.update(updateObj, data.consumerid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.consumersList[index].status = response.data.status;
          this.consumersList = [...this.consumersList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }

  }
  viewCustomer(id) {
    this.router.navigate(['business/consumers/view/' + id]);
  }
  getRowHeight(row) {
    return row.height;
  }
}
