import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../services/common";
import * as _ from 'lodash';
declare const AmCharts: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  counts = [];
  bizcounts = [];
  searchcounts = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getDashboardCounts();
    this.getDashboardBizCounts();
    this.getSearchCounts();
    setTimeout(() => {
      AmCharts.makeChart('analytics-graph', {
        'type': 'serial',
        'theme': 'light',
        // 'dataDateFormat': 'YYYY-MM-DD',
        'precision': 2,
        'valueAxes': [{
          'id': 'v1',
          'title': 'Search Count',
          'position': 'left',
          'autoGridCount': false,
          'labelFunction': function (value) {
            return '$' + Math.round(value) + 'M';
          }
        }, {
          'id': 'v2',
          'gridAlpha': 0.1,
          'autoGridCount': false
        }],
        'graphs': [{
          'id': 'g1',
          'valueAxis': 'v2',
          'lineThickness': 0,
          'fillAlphas': 0.9,
          'lineColor': '#4099ff ',
          'type': 'smoothedLine',
          'title': 'Category Name',
          'useLineColorForBulletBorder': true,
          'valueField': 'name',
          'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>'
        }
        // { 'id': 'g2',
        //   'valueAxis': 'v2',
        //   'fillAlphas': 0.9,
        //   'bulletColor': '#FF5370 ',
        //   'lineThickness': 0,
        //   'lineColor': '#FF5370 ',
        //   'type': 'smoothedLine',
        //   'title': 'count',
        //   'useLineColorForBulletBorder': true,
        //   'valueField': 'count',
        //   'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>'}
      ],
        'chartCursor': {
          'pan': true,
          'valueLineEnabled': true,
          'valueLineBalloonEnabled': true,
          'cursorAlpha': 0,
          'valueLineAlpha': 0.2
        },
        'categoryField': 'category',
        'categoryAxis': {
          // 'parseDates': true,
          'gridAlpha': 0,
          'minorGridEnabled': true
        },
        'legend': {
          'position': 'top',
        },
        'balloon': {
          'borderThickness': 1,
          'shadowAlpha': 0
        },
        'export': {
          'enabled': true
        },
        'dataProvider': [{
          'category': 'Category 1',
          'name': 20,
          // 'count': 0,
        }, {
          'category': 'Category 2',
          'name': 25,
          // 'count': 0,
        }, {
          'category': 'Category 3',
          'name': 15,
          // 'count': 0,
        }, {
          'category': 'Category 4',
          'name': 30,
          // 'count': 0,
        }, {
          'category': 'Category 5',
          'name': 35,
          // 'count': 20,
        // }, {
        //   'date': '2019-01-06',
        //   'name': 25,
        //   'count': 0,
        // }, {
        //   'date': '2019-01-07',
        //   'name': 0,
        //   'count': 0,
        }]
      });
    });
  }
  getDashboardCounts(){
    this.dashboardService.getCounts({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.counts = response.data;
      }
    });
  }
  getDashboardBizCounts(){
    this.bizcounts = [];
    this.dashboardService.employeebusinessCount({}).subscribe( res => {
      const response =  JSON.parse( res._body );
      if ( response.status ) {
        this.bizcounts = response.data;
      }
    })
  }
  getSearchCounts(){
    this.dashboardService.searchCount({}).subscribe( res => {
      const response = JSON.parse( res._body );
      if( response.status ){
        this.searchcounts = response.data;
        console.log(this.searchcounts);
      }
    })
  }
}
