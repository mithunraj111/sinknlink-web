import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { CategoryService } from '../../services/masters/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Output() categoryObj= {} as any;
  public data: any;
  tempFilter = [];
  categoryPage: any;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  categoryList = [];
  constructor(private categoryService: CategoryService) {
    this.tempFilter = this.categoryList;
  }

  ngOnInit() {
    this.getCategories();
  }

  // API call to get the category list

  getCategories() {
    const condition = {
      status: 'Active'
    };
    this.categoryService.list(condition).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.categoryList = response.data;
      }
    });
  }
  openCategoryModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeCategoryModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
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
    this.getCategories();
    this.closeCategoryModal('categorymodal');
  }
  search(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempFilter.filter(item => {
      for (let key in item) {
        if (("" + item[key]).toLocaleLowerCase().includes(val)) {
          return ("" + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.data = temp;
    this.table.offset = 0;
  }
}

