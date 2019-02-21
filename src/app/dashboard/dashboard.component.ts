import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../services/common";
import * as _ from 'lodash';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { timestamp } from 'rxjs-compat/operator/timestamp';
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
  constructor(private dashboardService: DashboardService, config: NgbDropdownConfig) {
    config.placement = 'top-right';
    config.autoClose = true;
  }

  ngOnInit() {
    this.getData(30);
  }
  getData(n) {
    let tDate = new Date();
    let toDate = tDate.getFullYear() + '-' + (tDate.getMonth() + 1) + '-' + tDate.getDate() + ' 23:59:59';
    let fromdate = new Date();
    let FromDate = fromdate.setDate(fromdate.getDate() - n);
    let cDate = new Date(FromDate);
    let fromDate = cDate.getFullYear() + '-' + (cDate.getMonth() + 1) + '-' + cDate.getDate() + ' 00:00:00';
    this.getDashboardCounts(fromDate, toDate);
    this.getDashboardBizCounts(fromDate, toDate);
    this.getSearchCounts(fromDate, toDate);
  }
  getDashboardCounts(fromDate, toDate) {
    this.dashboardService.getCounts({ "fromDate": fromDate, "toDate": toDate }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.counts = response.data;
        // console.log('getCounts');
      }
    });
  }
  getDashboardBizCounts(fromDate, toDate) {
    this.bizcounts = [];
    this.dashboardService.employeebusinessCount({ "fromDate": fromDate, "toDate": toDate }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.bizcounts = response.data;
        // console.log('employeebusinessCount');
      }
    })
  }
  getSearchCounts(fromDate, toDate) {
    this.dashboardService.searchCount({ "fromDate": fromDate, "toDate": toDate }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.searchcounts = response.data;
        this.generateCatCountChart(this.searchcounts.map((d) => {
          return {
            category: d.categoryname,
            name: d.count
          }
        }));
      }
    }, err => {
      console.log(err);
    })
  }
  generateCatCountChart(data) {
    AmCharts.makeChart('analytics-graph', {
      'type': 'serial',
      'theme': 'light',
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
        'bulletColor': '#4099ff ',
        'lineColor': '#4099ff ',
        'type': 'smoothedLine',
        'title': 'Search count',
        'useLineColorForBulletBorder': true,
        'valueField': 'name',
        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>'
      }],
      'chartCursor': {
        'pan': true,
        'valueLineEnabled': true,
        'valueLineBalloonEnabled': true,
        'cursorAlpha': 0,
        'valueLineAlpha': 0.2
      },
      'categoryField': 'category',
      'categoryAxis': {
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
      'dataProvider': data
    });
  }
}
