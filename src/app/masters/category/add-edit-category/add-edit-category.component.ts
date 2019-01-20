import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AppConstant } from '../../../app.constants';
import * as _ from 'lodash';
import { CategoryService } from '../../../services/masters/category.service';
@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit, OnChanges {
  userstoragedata = {} as any;
  categoryForm: FormGroup;
  formTitle = AppConstant.FORM_TITLE.CATEGORY.ADD;
  buttonTxt = AppConstant.BUTTON_TXT.SAVE;
  @Output() notifyCategoryEntry: EventEmitter<any> = new EventEmitter();
  @Input() categoryObj = {} as any;
  constructor(private bootstrapAlertService: BootstrapAlertService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder, private categoryService: CategoryService) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      categoryname: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      status: [''],
    });
    this.categoryObj = {};
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.categoryObj);
    if (!_.isUndefined(changes.categoryObj) && !_.isEmpty(changes.categoryObj.currentValue)) {
      this.buttonTxt = AppConstant.BUTTON_TXT.UPDATE;
      this.formTitle = AppConstant.FORM_TITLE.CATEGORY.UPDATE;
      this.categoryObj = changes.categoryObj.currentValue;
      this.categoryForm = this.fb.group({
        categoryname: [this.categoryObj.categoryname,
        Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
        status: [this.categoryObj.status === AppConstant.STATUS_ACTIVE ? true : false, Validators.required],
      });
    } else {
      this.initForm();
      this.buttonTxt = AppConstant.BUTTON_TXT.SAVE;
      this.formTitle = AppConstant.FORM_TITLE.CATEGORY.ADD;
    }
  }
  saveOrUpdateCategory() {
    console.log('saveOrUpdateCategory');
    let errorMessage: any;

    console.log(this.categoryForm.status);
    if (this.categoryForm.status === 'INVALID') {
      console.log(this.categoryForm.status);
      return false;
    } else {
      let data = this.categoryForm.value;
      let formdata = {} as any;
      formdata.categoryname = data.categoryname;
      formdata.updatedby = '';
      formdata.updateddt = new Date();
      if (!_.isUndefined(this.categoryObj) && !_.isUndefined(this.categoryObj.categoryid) && !_.isEmpty(this.categoryObj)) {
        formdata.status = data.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
        this.categoryService.update(formdata, this.categoryObj.categoryid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.notifyCategoryEntry.next({ update: true, data: response.data });
          } else {
          }
        });
      } else {
        formdata.status = AppConstant.STATUS_ACTIVE;
        formdata.createdby = '';
        formdata.createddt = new Date();
        this.categoryService.create(formdata).subscribe((res) => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.notifyCategoryEntry.next({ add: true, data: response.data });
          } else {

          }
        }, err => {
        });
      }

    }
  }
}
