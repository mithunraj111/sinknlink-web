import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';
import { AppCommonService } from 'src/app/services';
import { DatePipe } from '@angular/common';
import downloadService from '../../services/download.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-area-categories',
  templateUrl: './area-categories.component.html',
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class AreaCategoriesComponent implements OnInit {
  @ViewChild(DatatableComponent) areaTable: DatatableComponent;
  @ViewChild(DatatableComponent) categoriestable: DatatableComponent;
  areaCategoriesForm: FormGroup;
  areaCategoriesObj = AppMessages.VALIDATION.AREACATEGORIES;
  areatempFilter = [];
  areaList = [];
  categoriesList = [];
  categorytempFilter = [];
  generatingFile = false;
  emptymesages = AppConstant.EMPTY_MESSAGES.AREA;
  nodata = AppConstant.EMPTY_MESSAGES.CATEGORY;
  loadingIndicator = false;
  formData = {} as any;
  constructor(private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService, private fb: FormBuilder,
    private reportService: AppCommonService.ReportService) {
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.areaCategoriesForm = this.fb.group({
      fromdate: [this.commonService.parseDate(new Date())],
      todate: [this.commonService.parseDate(new Date())]
    });
  }
  getAreaCategories() {
    const data = this.areaCategoriesForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.AREACATEGORIES.fromdate.max);
      return false;
    }
    this.formData = {
      fromdate: fromdt + ' 00:00',
      todate: todt + ' 23:59'
    };
    this.getAreaList();
    this.getCategoryList();

  }

  genFormData() {
    const data = this.areaCategoriesForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.AREACATEGORIES.fromdate.max);
      return false;
    } else {
      const formData = {
        fromdate: fromdt + ' 00:00',
        todate: todt + ' 23:59'
      };
      return formData;
    }
  }

  getCategoryList(download?) {
    let service;
    this.loadingIndicator = true;
    this.generatingFile = false;
    if (download) {
      service = this.reportService.getCategoryWiseCount(this.formData, true);
    } else {
      service = this.reportService.getCategoryWiseCount(this.formData);
    }
    service.subscribe(res => {
      if (download) {
        this.loadingIndicator = true;
        var buffer = Buffer.from(JSON.parse(res._body).file.data);
        downloadService(buffer, `CategoryReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
        this.loadingIndicator = false;
      } else {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.loadingIndicator = false;
          this.categoriesList = response.data;
        }
        this.loadingIndicator = false;
        this.categorytempFilter = this.categoriesList;
      }
    });
  }
  getAreaList(download?) {
    let service;
    this.loadingIndicator = true;
    if (download) {
      service = this.reportService.getAreaWiseCount(this.genFormData(), true);
    } else {
      service = this.reportService.getAreaWiseCount(this.genFormData());
    }
    service.subscribe(res => {
      if (download) {
        this.loadingIndicator = true;
        var buffer = Buffer.from(JSON.parse(res._body).file.data);
        this.generatingFile = false;
        downloadService(buffer, `AreaReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
        this.loadingIndicator = false;
      } else {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.loadingIndicator = false;
          this.areaList = response.data;
        }
        this.loadingIndicator = false;
        this.areatempFilter = this.areaList;
      }
    })
  }
  search(event?) {
    this.areaList = this.commonService.globalSearch(this.areatempFilter, event);
    this.areaTable.offset = 0;
  }
  searchCategory(event?) {
    this.categoriesList = this.commonService.globalSearch(this.categorytempFilter, event);
    this.categoriestable.offset = 0;
  }
}
