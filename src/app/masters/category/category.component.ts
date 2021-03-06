import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { MasterService, BaseService, CommonService } from '../../services';
import * as _ from 'lodash';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../../app-messages';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent extends BaseService implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Output() categoryObj = {} as any;
  public data: any;
  tempFilter = [];
  categoryPage: any;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  categoryList = [];
  loadingIndicator = true;

  emptymessages = AppConstant.EMPTY_MESSAGES.CATEGORIES;
  constructor(private categoryService: MasterService.CategoryService,
    private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService,
  ) {
    super();
    this.getScreenDetails('m_categories');
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
    if (flag) {
      this.categoryService.delete(updateObj, data.categoryid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess('#' + data.categoryid + ' ' + response.message);
          this.categoryList.splice(index, 1);
          this.categoryList = [...this.categoryList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    } else {
      const formData = new FormData();
      formData.append('data', JSON.stringify(updateObj));
      this.categoryService.update(formData, data.categoryid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.categoryList[index].status = response.data.status;
          this.categoryList = [...this.categoryList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }
  }
  // API call to get the category list
  getCategories() {
    this.loadingIndicator = true;
    const condition = {
    };
    this.categoryService.list(condition, '').subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.categoryList = response.data;
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
  search(event?) {
    this.categoryList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
  notifyCategoryEntry(event) {
    this.categoryObj = {};
    if (!event.close) {
      this.getCategories();
      this.closeCategoryModal('categorymodal');
    } else {
      this.closeCategoryModal('categorymodal');
    }
  }
}

