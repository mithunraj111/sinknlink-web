import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-area-categories',
  templateUrl: './area-categories.component.html',
  styleUrls: ['./area-categories.component.scss']
})
export class AreaCategoriesComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  areaList = [
    { area: "Chennai", pincode: "641035", businesscount: "10" },
    { area: "Coimbatore", pincode: "641035", businesscount: "25" }
  ];
  categoriesList = [
    { categoryname: "Pen",  businesscount: "10" },
    { categoryname: "Ball",  businesscount: "15" },
  ];
  constructor() { }

  ngOnInit() {
  }

}
