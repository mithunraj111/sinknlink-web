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
@Component({
  selector: 'app-area-categories',
  templateUrl: './area-categories.component.html',
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class AreaCategoriesComponent implements OnInit {
  @ViewChild(DatatableComponent) areaTable: DatatableComponent;
  @ViewChild(DatatableComponent) categoryTable: DatatableComponent;
  areaCategoriesForm: FormGroup;
  areaCategoriesObj = AppMessages.VALIDATION.AREACATEGORIES;
  areatempFilter = [];
  areaList = [];
  categoriesList = [];
  categorytempFilter = [];
  emptymesages = AppConstant.EMPTY_MESSAGES.AREA;
  nodata = AppConstant.EMPTY_MESSAGES.CATEGORY;
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
    const formData = {
      fromdate: fromdt,
      todate: todt
    };
    this.getAreaList(formData);
    this.getCategoryList(formData);
  }

  getCategoryList(formData) {
    this.reportService.getCategoryWiseCount(formData).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.categoriesList = response.data;
      }
      this.categorytempFilter = this.categoriesList;
    });
  }
  getAreaList(formData) {
    this.reportService.getAreaWiseCount(formData).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.areaList = response.data;
      }
      this.areatempFilter = this.areaList;

    });
  }
  search(event?) {
    this.areaList = this.commonService.globalSearch(this.areatempFilter, event);
    this.areaTable.offset = 0;
  }
  searchCategory(event?) {
    this.categoriesList = this.commonService.globalSearch(this.categorytempFilter, event);
    this.categoryTable.offset = 0;
  }
}
