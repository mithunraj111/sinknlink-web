import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { CategoryService } from '../../services/masters/category.service';
import * as _ from 'lodash';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../../app-messages';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Output() categoryObj = {} as any;
  public data: any;
  tempFilter = [];
  categoryPage: any;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  categoryList = [];
  userstoragedata = {} as any;
  constructor(private categoryService: CategoryService,
    private localStorageService: LocalStorageService,
    private bootstrapAlertService: BootstrapAlertService) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }
  ngOnInit() {
    this.getCategories();
  }
  updateCategoryStatus(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    this.categoryService.update(updateObj, data.categoryid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (flag) {
          this.bootstrapAlertService.showSucccess('#' + data.categoryid + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
          this.categoryList.splice(index, 1);
          this.getCategories();
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
          this.categoryList[index] = response.data;
        }
        this.categoryList = [...this.categoryList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  // API call to get the category list
  getCategories() {
    const condition = {
    };
    this.categoryService.list(condition, '').subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (this.categoryList.length != 0) {
          this.categoryList = response.data.rows;
          this.categoryList = [...this.categoryList];
        } else {
          this.categoryList = response.data.rows;
        }
        this.tempFilter = this.categoryList;
      }
    });
  }
  openCategoryModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeCategoryModal(event) {
    document.querySelector('#' + event).classList.remove('md-show');
  }
  getRowHeight(row) {
    return row.height;
  }
  addCategory() {
    this.categoryObj = {};
    this.openCategoryModal('categorymodal');

  }
  editCategory(data) {
    this.categoryObj = data;
    this.openCategoryModal('categorymodal');
  }
  search(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempFilter.filter(item => {
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.categoryList = temp;
    this.table.offset = 0;
  }
  notifyCategoryEntry(event) {
    if (!event.close) {
      this.getCategories();
      this.closeCategoryModal('categorymodal');
    } else {
      this.closeCategoryModal('categorymodal');
    }
  }
}

