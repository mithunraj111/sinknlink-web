import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Output() categorydtls: {};
  public data: any;
  public rowsOnPage = 8;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
    formTitle: string;
  formSubmit: string;
  categoryPage: any;
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
  }

  ngOnInit() {
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  addCategory(){
    this.categorydtls= {};
    this.formTitle= 'Add Business Category';
    this.formSubmit= 'Save';
    this.openMyModal('categorymodal');
    this.categoryPage =false;
  }
  editCategory(data){
    this.categorydtls= data;
    this.formTitle= 'Edit Business Category';
    this.formSubmit= 'Update';
    this.openMyModal('categorymodal');
     this.categoryPage =true;
  }
}

