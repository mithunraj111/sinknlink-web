import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { CategoryService } from '../../services/masters/category.service';
import * as _ from 'lodash';
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

  constructor(private categoryService: CategoryService) {
    
  }

  ngOnInit() {
    this.getCategories();
  }

  // API call to get the category list

  getCategories() {
    const condition = {
      // limit: 'Active'
    };
    // let query = 'limit=11' + '&offset=' + this.categoryList.length;
    this.categoryService.list(condition, '').subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (this.categoryList.length != 0) {
          this.categoryList = this.categoryList.concat(response.data.rows);
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
    console.log((event.target.parentElement.parentElement));
    (event.target.parentElement.parentElement).classList.remove('md-show');
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

  notifyCategoryEntry(event) {
    let existData = {} as any;
    existData = _.find(this.categoryList, { categoryid: event.data.categoryid });
    if (existData === undefined) {
      this.categoryList = [event, ...this.categoryList];
    } else {
      const index = _.indexOf(this.categoryList, existData);
      this.categoryList[index] = event.data;
      this.categoryList = [...this.categoryList];
    }
    this.closeCategoryModal('categorymodal');
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
    this.data = temp;
    this.table.offset = 0;
  }
}

