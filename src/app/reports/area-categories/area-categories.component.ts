import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
@Component({
  selector: 'app-area-categories',
  templateUrl: './area-categories.component.html',
  styleUrls: ['./area-categories.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class AreaCategoriesComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  areaList = [
    { area: "Chennai", pincode: "641035", businesscount: "10" },
    { area: "Coimbatore", pincode: "641035", businesscount: "25" }
  ];
  categoriesList = [
    { categoryname: "Pen", businesscount: "10" },
    { categoryname: "Ball", businesscount: "15" },
  ];
  constructor() {
  }

  ngOnInit() {
  }


}
