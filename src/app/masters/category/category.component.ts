import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public data: any;
  public rowsOnPage = 8;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  constructor() {
    this.data = [
      {
        businesscategory: 'Nike', lastupdateddt: '26-Dec-2018 15:00', lastupdatedby: 'Admin'
      },
      {
        businesscategory: 'Piece', lastupdateddt: '26-Dec-2018 15:00', lastupdatedby: 'Admin'
      }
    ];
  }

  ngOnInit() {
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
}

