import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services';
import { PaymentsService } from 'src/app/services/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import downloadService from '../../services/download.service';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';
import { DonationService } from 'src/app/services/admin';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
  @ViewChild(DatatableComponent) donationReportTable: DatatableComponent;
  donationForm: FormGroup;
  allDonationList = [];
  donationList = [];
  loadingIndicator = false;
  generatingFile = false;
  tempFilter = [];
  selectedKeyType: any;
  emptymessages = AppConstant.EMPTY_MESSAGES.DONATIONREPORT;

  constructor(
    private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
    private paymentService: PaymentsService,
    private donationService: DonationService,
    private fb: FormBuilder
  ) { }

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
        // this.selectedKeyType = this.allDonationList[0].donationid.toString(); 
      }
    });
  }

  getDonationList(option?) {
    const formData = {} as any;
    if( option === 'Download' || option === 'Refresh') {
      formData.donationid = Number(this.selectedKeyType);
    } else {
      formData.donationid = option.donationid;
    }
    let service;
    if ( option === 'Download' ) {
      this.generatingFile = false;
      service = this.paymentService.list(formData, true);
    } else {
      this.loadingIndicator = true;
      service = this.paymentService.list(formData);
    }
    service.subscribe(res => {
      if ( option === 'Download' ) {
        var buffer = Buffer.from(JSON.parse(res._body).file.data);
        downloadService(buffer, `DonationReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
        this.generatingFile = false;
      } else {
        this.loadingIndicator = true;
        const response = JSON.parse(res._body);
        if (response.status) {
          this.loadingIndicator = false;
          this.donationList = response.data;
        }
        this.loadingIndicator = false;
        this.tempFilter = this.donationList;
      }
    });
  }
  search(event?) {
    this.donationList = this.commonService.globalSearch(this.tempFilter, event);
    this.donationReportTable.offset = 0;
  }

}
