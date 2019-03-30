import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';
import { AppCommonService, BaseService, CommonService } from 'src/app/services';
import { DatePipe } from '@angular/common';
import downloadService from '../../services/download.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class AreaComponent extends BaseService implements OnInit {
  @ViewChild(DatatableComponent) areaTable: DatatableComponent;
  areaForm: FormGroup;
  areaCategoriesObj = AppMessages.VALIDATION.AREACATEGORIES;
  areatempFilter = [];
  areaList = [];
  generatingFile = false;
  emptymesages = AppConstant.EMPTY_MESSAGES.AREA;
  loadingIndicator = false;
  formData = {} as any;
  constructor(private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService, private fb: FormBuilder,
    private reportService: AppCommonService.ReportService) {
    super();
    this.getScreenDetails('r_area');
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.areaForm = this.fb.group({
      fromdate: [this.commonService.parseDate(new Date())],
      todate: [this.commonService.parseDate(new Date())]
    });
  }
  getArea() {
    const data = this.areaForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.AREACATEGORIES.fromdate.max);
      return false;
    }
    this.getAreaList();
  }

  genFormData() {
    const data = this.areaForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.AREACATEGORIES.fromdate.max);
      return false;
    } else {
      const formData = {
        fromdate: fromdt + ' 00:00',
        todate: todt + ' 23:59'
      } as any;

      if (this.userstoragedata.roleid === 2) {
        formData.dealerid = this.dealerdata.dealerid;
      }
      return formData;
    }
  }

  getAreaList(download?) {
    let service;
    if (download) {
      this.generatingFile = true;
      service = this.reportService.getAreaWiseCount(this.genFormData(), true);
    } else {
      service = this.reportService.getAreaWiseCount(this.genFormData());
    }
    service.subscribe(res => {
      if (download) {
        var buffer = Buffer.from(JSON.parse(res._body).file.data);
        downloadService(buffer, `AreaReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
        this.generatingFile = false;
      } else {
        this.loadingIndicator = true;
        const response = JSON.parse(res._body);
        if (response.status) {
          this.loadingIndicator = false;
          this.areaList = response.data;
        }
        this.loadingIndicator = false;
        this.areatempFilter = this.areaList;
      }
    });
  }
  search(event?) {
    this.areaList = this.commonService.globalSearch(this.areatempFilter, event);
    this.areaTable.offset = 0;
  }

}
