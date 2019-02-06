import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AppConstant } from '../../../app.constants';
import * as _ from 'lodash';
import { CategoryService } from '../../../services/masters/category.service';
import { CommonService } from '../../../services/common.service';
import { AppMessages } from 'src/app/app-messages';

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
  @ViewChild('categoryimage') categoryimage: ElementRef;
  categoryErrObj = AppMessages.VALIDATION.CATEGORY;
  categoryid: number;
  errMessage;
  categoryimgfile: any;
  categoryfile: any;
  fileUrl = AppConstant.IMG_BASE_URL;
  constructor(private bootstrapAlertService: BootstrapAlertService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder, private categoryService: CategoryService,
    private commonService: CommonService) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.initForm();
  }
  close(event) {
    this.categoryimage.nativeElement.value = '';
    this.categoryfile = null;
    this.categoryimgfile = null;
    this.notifyCategoryEntry.emit({ close: true });
  }
  callParent(data) {
    this.categoryimage.nativeElement.value = '';
    this.categoryfile = null;
    this.categoryimgfile = null;
    setTimeout(() => {
      this.notifyCategoryEntry.emit(data);
    }, 5000);
  }
  onFile(event) {
    const reader = new FileReader();
    this.categoryimgfile = event.target.files[0];
    reader.onload = ((e) => {
      this.categoryfile = e.target['result'];
    });
    reader.readAsDataURL(event.target.files[0]);
  }
  initForm() {
    this.categoryForm = this.fb.group({
      categoryname: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      categoryimg: [''],
      status: [''],
    });
    this.categoryObj = {};
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!_.isUndefined(changes.categoryObj) && !_.isEmpty(changes.categoryObj.currentValue)) {
      this.buttonTxt = AppConstant.BUTTON_TXT.UPDATE;
      this.formTitle = AppConstant.FORM_TITLE.CATEGORY.UPDATE;
      this.categoryObj = changes.categoryObj.currentValue;
      this.categoryForm = this.fb.group({
        categoryname: [this.categoryObj.categoryname,
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
        categoryimg: [this.categoryObj.categoryimg],
        status: [this.categoryObj.status],
      });
      if (this.categoryObj.categoryimage) {
        this.categoryfile = this.fileUrl + '/' + this.categoryObj.categoryimage.docurl;
      }
    } else {
      this.initForm();
      this.buttonTxt = AppConstant.BUTTON_TXT.SAVE;
      this.formTitle = AppConstant.FORM_TITLE.CATEGORY.ADD;
    }
  }
  saveOrUpdateCategory() {
    if (this.categoryForm.status === AppConstant.STATUS_INVALID) {
      this.errMessage = this.commonService.getFormErrorMessage(this.categoryForm, this.categoryErrObj);
      this.bootstrapAlertService.showError(this.errMessage);
      return false;
    } else {
      const formdata = new FormData();
      if (_.isUndefined(this.categoryfile) || _.isNull(this.categoryfile)) {
        this.bootstrapAlertService.showError(this.categoryErrObj.categoryimg);
        return false;
      } else {
        formdata.append('categoryimg', this.categoryimgfile);
      }
      const data = {} as any;
      data.categoryname = this.categoryForm.value.categoryname;
      data.categoryimg = this.categoryForm.value.categoryimg;
      data.updatedby = this.userstoragedata.fullname;
      data.updateddt = new Date();
      if (!_.isUndefined(this.categoryObj) && !_.isUndefined(this.categoryObj.categoryid) && !_.isEmpty(this.categoryObj)) {
        data.status = data.status;
        formdata.append('formData', JSON.stringify(data));
        this.categoryService.update(formdata, this.categoryObj.categoryid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.callParent({ update: false, data: response.data });
            this.bootstrapAlertService.showSucccess(response.message);
          } else {
            this.bootstrapAlertService.showError(response.message);
          }
        });
      } else {
        data.status = AppConstant.STATUS_ACTIVE;
        data.createdby = this.userstoragedata.fullname;
        data.createddt = new Date();
        formdata.append('formData', JSON.stringify(data));
        this.categoryService.create(formdata).subscribe((res) => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.callParent({ update: true, data: response.data });
          } else {
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
        });
      }
    }
  }
}
