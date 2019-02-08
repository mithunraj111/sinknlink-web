import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';
import { LocationService } from 'src/app/services/masters';
import { LookupService } from 'src/app/services/admin';
import { DealerService } from 'src/app/services/business';
import { AppCommonService } from 'src/app/services';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class DealerComponent implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  dealerReportForm: FormGroup;
  fromdate;
  todate;
  cityList: any = [];
  areaList: any = [];
  tempFilter = [];
  dealerReportList =[];
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private bootstrapAlertService: BootstrapAlertService,
    private locationService: LocationService,
    private lookupService: LookupService,
    private reportService: AppCommonService.ReportService
  ) {
    this.initForm();
    this.getCities();
    this.tempFilter = this.dealerReportList;
  }

  ngOnInit() {
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
    this.dealerReportList = temp;
    this.table.offset = 0;
  }
  initForm() {
    this.dealerReportForm = this.fb.group({
      fromdate: [this.commonService.parseDate(new Date())],
      todate: [this.commonService.parseDate(new Date())],
      city: [''],
      area: ['']
    });

  }
  getDealerReport() {
    const data = this.dealerReportForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.DEALERREPORT.fromdate.max);
      return false;
    }
    const formData = {
      fromdate: fromdt,
      todate: todt
    };
    this.getDealer(formData);
  }
  getDealer(formData) {
    this.reportService.areawiseDealerCount(formData).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.dealerReportList = response.data;
      }
      console.log(this.dealerReportList)
    });
  }
  getCities() {
    this.lookupService.list({ refKey: 'biz_businesscity', status: AppConstant.STATUS_ACTIVE }).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.refname;
          item.value = item.refvalue;
        })
        this.cityList = response.data;
      } else {
        this.cityList = [];
      }
    });
  }
  
  


}
