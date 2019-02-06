import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';
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

  areaList = [
    { area: "Chennai", pincode: "641035", businesscount: "10" },
    { area: "Coimbatore", pincode: "641035", businesscount: "25" }
  ];
  categoriesList = [
    { categoryname: "Pen", businesscount: "10" },
    { categoryname: "Ball", businesscount: "15" },
  ];
  errMessage: any;
  constructor(private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.initForm();
    this.getAreaCategories();
  }
  initForm() {
    this.areaCategoriesForm = this.fb.group({
      fromdate: [''],
      todate: ['']
    })
  }
  getAreaCategories() {
    const data = this.areaCategoriesForm.value;
    const todt = this.commonService.formatDate(data.todate);
    const fromdt = this.commonService.formatDate(data.fromdate);
    if (new Date(todt) < new Date(fromdt)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.AREACATEGORIES.fromdate.max);
      return false;
    }

  }

}
