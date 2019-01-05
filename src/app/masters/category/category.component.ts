import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Output() categorydtls: {};
  public data: any;
  public rowsOnPage = 8;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  tempFilter = [];
  formTitle: string;
  formSubmit: string;
  categoryPage: any;
  date_displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: any;
  constructor() {
    this.data = [
      { businesscategory: 'Nike', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Piece', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Nike', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Piece', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Nike', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Piece', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Nike', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Piece', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Nike', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Piece', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Nike', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Piece', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Nike', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' },
      { businesscategory: 'Piece', updateddt: '26-Dec-2018 15:00', updatedby: 'Admin' }
    ];
    this.tempFilter = this.data;
    this.date = new Date();

  }

  ngOnInit() {
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  addCategory() {
    this.categorydtls = {};
    this.formTitle = 'Add Business Category';
    this.formSubmit = 'Save';
    this.openMyModal('categorymodal');
    this.categoryPage = false;
  }
  editCategory(data) {
    this.categorydtls = data;
    this.formTitle = 'Edit Business Category';
    this.formSubmit = 'Update';
    this.openMyModal('categorymodal');
    this.categoryPage = true;
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

