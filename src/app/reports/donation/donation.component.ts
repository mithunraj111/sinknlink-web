import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentsService } from 'src/app/services/common';
import { AppConstant } from '../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import downloadService from '../../services/download.service';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';
import { DonationService } from 'src/app/services/admin';
import { BaseService } from '../../services';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent extends BaseService implements OnInit {
  @ViewChild(DatatableComponent) donationReportTable: DatatableComponent;
  allDonationList = [];
  donationList = [];
  loadingIndicator = false;
  generatingFile = false;
  tempFilter = [];
  selectedKeyType: any;
  donationAmount;
  datetimedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  emptymessages = AppConstant.EMPTY_MESSAGES.DONATIONREPORT;

  constructor(private paymentService: PaymentsService, private donationService: DonationService) { 
    super();
    this.getScreenDetails('r_donations');
  }

  ngOnInit() { this.getList(); }
  getList() {
    this.donationService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.charityname;
          item.value = item.donationid.toString();
        });
        this.allDonationList = this.allDonationList.concat(response.data);
      }
    });
  }

  getDonationList(option?) {
    const formData = {} as any;
    if (option === 'Download' || option === 'Refresh') {
      formData.donationid = Number(this.selectedKeyType);
    } else {
      formData.donationid = option.donationid;
    }
    let service;
    if (option === 'Download') {
      this.generatingFile = false;
      service = this.paymentService.list(formData, true);
    } else {
      this.loadingIndicator = true;
      service = this.paymentService.list(formData);
    }
    service.subscribe(res => {
      if (option === 'Download') {
        var buffer = Buffer.from(JSON.parse(res._body).file.data);
        downloadService(buffer, `DonationReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
        this.generatingFile = false;
      } else {
        this.loadingIndicator = true;
        const response = JSON.parse(res._body);
        if (response.status) {
          this.loadingIndicator = false;
          this.donationList = response.data;
          this.donationAmount = 0;
          for (let i = 0; i < this.donationList.length; i++) {
            this.donationAmount = this.donationAmount + Number(this.donationList[i].donation);
          }
        }
        this.loadingIndicator = false;
        this.tempFilter = this.donationList;
      }
    });
  }
  // search(event?) {
  //   this.donationList = this.commonService.globalSearch(this.tempFilter, event);
  //   this.donationReportTable.offset = 0;
  // }

}
