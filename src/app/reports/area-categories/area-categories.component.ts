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
  styleUrls: ['./area-categories.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class AreaCategoriesComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  areaCategoriesForm: FormGroup;
  areaCategoriesObj = AppMessages.VALIDATION.AREACATEGORIES;
  tempFilter = [];
  areaList = [];
  categoriesList = [];
  constructor(private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService, private fb: FormBuilder,
    private reportService: AppCommonService.ReportService) {
    this.tempFilter = this.areaList;
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.areaCategoriesForm = this.fb.group({
      fromdate: [''],
      todate: ['']
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
    });
  }
  getAreaList(formData) {
    this.reportService.getAreaWiseCount(formData).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.areaList = response.data;
      }
    });
  }
  search(event?) {
    this.areaList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
 
}
