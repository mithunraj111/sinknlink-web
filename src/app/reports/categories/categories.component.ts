import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';
import { AppCommonService, BaseService, CommonService } from 'src/app/services';
import { DatePipe } from '@angular/common';
import downloadService from '../../services/download.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class CategoriesComponent extends BaseService implements OnInit {
  @ViewChild(DatatableComponent) categoriestable: DatatableComponent;
  categoriesForm: FormGroup;
  areaCategoriesObj = AppMessages.VALIDATION.AREACATEGORIES;
  categoriesList = [];
  categorytempFilter = [];
  generatingFile = false;
  nodata = AppConstant.EMPTY_MESSAGES.CATEGORY;
  loadingIndicator = false;
  formData = {} as any;
  constructor(private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService, private fb: FormBuilder,
    private reportService: AppCommonService.ReportService) {
    super();
    this.getScreenDetails('r_categories');
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.categoriesForm = this.fb.group({
      fromdate: [this.commonService.parseDate(new Date())],
      todate: [this.commonService.parseDate(new Date())]
    });
  }
  getAreaCategories() {
    const data = this.categoriesForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.AREACATEGORIES.fromdate.max);
      return false;
    }
    this.getCategoryList();

  }

  genFormData() {
    const data = this.categoriesForm.value;
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

  getCategoryList(download?) {
    let service;
    if (download) {
      this.generatingFile = true;
      service = this.reportService.getCategoryWiseCount(this.genFormData(), true);
    } else {
      this.loadingIndicator = true;
      service = this.reportService.getCategoryWiseCount(this.genFormData());
    }
    service.subscribe(res => {
      if (download) {
        var buffer = Buffer.from(JSON.parse(res._body).file.data);
        downloadService(buffer, `CategoryReport-${new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy").toString()}.xlsx`);
        this.generatingFile = false;
      } else {
        this.loadingIndicator = true;
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
  searchCategory(event?) {
    this.categoriesList = this.commonService.globalSearch(this.categorytempFilter, event);
    this.categoriestable.offset = 0;
  }
}
