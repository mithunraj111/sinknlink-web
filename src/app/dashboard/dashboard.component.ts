import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/common';
import * as _ from 'lodash';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BaseService } from '../services';
import { AppConstant } from '../app.constants';
import { fadeInOutTranslate } from '../../assets/animations/fadeInOutTranslate';
import { ConsumerService } from '../services/business';
declare const AmCharts: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeInOutTranslate]
})
export class DashboardComponent extends BaseService implements OnInit {
  counts = [];
  bizcounts = [];
  displaydatetimeformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  displaydateformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  bizdefaultrating = [
    { count: 0, label: 5 },
    { count: 0, label: 4 },
    { count: 0, label: 3 },
    { count: 0, label: 2 },
    { count: 0, label: 1 }
  ];
  searchcounts = [];
  service;
  loadingIndicator = false;
  dealerstoragedata = this.localStorageService.getItem('dealer-');
  constructor(private dashboardService: DashboardService,
    private consumerService: ConsumerService,
    config: NgbDropdownConfig) {
    super();
    config.placement = 'top-right';
    config.autoClose = true;
  }
  filterRange: String = 'month';

  ngOnInit() {
    this.getData(this.filterRange);
  }
  getData(n, filter?) {
    this.loadingIndicator = true;
    let fromDate;
    let toDate;

    this.filterRange = n;

    switch (n) {

      case 'today':
        fromDate = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd').toString() + ' 00:00:00';
        toDate = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd').toString() + ' 23:59:59';
        break;

      case 'week':
        fromDate = new DatePipe('en-US').transform((function () {
          let d = new Date();
          var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
          return new Date(d.setDate(diff));
        }()), 'yyyy-MM-dd').toString() + ' 00:00:00';
        toDate = new DatePipe('en-US').transform((function () {
          let date = new Date();
          var lastday = date.getDate() - (date.getDay() - 1) + 6;
          return new Date(date.setDate(lastday));
        }()), 'yyyy-MM-dd').toString() + ' 23:59:59';
        break;

      case 'month':
        fromDate = new DatePipe('en-US').transform((function () {
          let date = new Date();
          return new Date(date.getFullYear(), date.getMonth(), 1);
        }()), 'yyyy-MM-dd').toString() + ' 00:00:00';
        toDate = new DatePipe('en-US').transform((function () {
          let date = new Date();
          return new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }()), 'yyyy-MM-dd').toString() + ' 23:59:59';
        break;

      default:
        fromDate = new DatePipe('en-US').transform((function () {
          let date = new Date();
          return new Date(date.getFullYear(), date.getMonth(), 1);
        }()), 'yyyy-MM-dd').toString() + ' 00:00:00';
        toDate = new DatePipe('en-US').transform((function () {
          let date = new Date();
          return new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }()), 'yyyy-MM-dd').toString() + ' 23:59:59';
        break;

    }
    if (filter === undefined) {
      this.getDashboardCounts(fromDate, toDate);
      this.getDashboardBizCounts(fromDate, toDate);
      this.getSearchCounts(fromDate, toDate);
    } else {
      if (filter === 'getDashboardBizCounts') {
        this.getDashboardBizCounts(fromDate, toDate);
        this.loadingIndicator = false;
      } else {
        if (filter === 'getSearchCounts') {
          this.getSearchCounts(fromDate, toDate);
          this.loadingIndicator = false;
        }
      }
    }
  }
  getDashboardCounts(fromDate, toDate) {
    if (this.userstoragedata.roleid === 3) {
      this.service = this.dashboardService.customer({
        fromDate: fromDate, toDate: toDate,
        memid: this.userstoragedata.customer.membershipid
      });
    } else {
      if (this.userstoragedata.roleid === 2) {
        this.service = this.dashboardService.dealer({ fromDate: fromDate, toDate: toDate, dealerid: this.dealerstoragedata.dealerid});
      } else {
        this.service = this.dashboardService.getCounts({ fromDate: fromDate, toDate: toDate });
      }
    }
    this.service.subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.counts = response.data;
      }
    });
  }
  getDashboardBizCounts(fromDate, toDate) {
    this.bizcounts = [];
    if (this.userstoragedata.roleid === 3) {
      this.service = this.dashboardService.rating({
        fromDate: fromDate, toDate: toDate,
        memid: this.userstoragedata.customer.membershipid
      });
    } else {
      if (this.userstoragedata.roleid === 2) {
        this.service = this.dashboardService.dealerbizcount({
          fromDate: fromDate,
          toDate: toDate,
          dealerid: this.dealerstoragedata.dealerid
        });
      } else {
      this.service = this.dashboardService.employeebusinessCount({ fromDate: fromDate, toDate: toDate });
      }
    }
    this.service.subscribe(res => {
      const response = JSON.parse(res._body);
      this.loadingIndicator = false;
      if (response.status) {
        this.bizcounts = response.data;
        console.log(this.bizcounts);
        if (this.userstoragedata.roleid === 3) {
          const self = this;
          _.each(this.bizdefaultrating, function (item, idx) {
            const countObj: any = _.find(self.bizcounts, function (itm) {
              if (itm.label === item.label) {
                return itm;
              }
            });
            if (countObj != undefined) {
              self.bizdefaultrating[idx].count = countObj.count;
            }
          });
        }
      }
    });
  }

  getSearchCounts(fromDate, toDate) {
    if (this.userstoragedata.roleid === 3) {
      this.service = this.consumerService.consumerReviews(
        { membershipid: this.userstoragedata.customer.membershipid }, '5', '0');
    } else {
      if (this.userstoragedata.roleid === 2) {
        this.service = this.dashboardService.dealerreview({
          fromDate: fromDate,
          toDate: toDate,
          dealerid: this.dealerstoragedata.dealerid
        });
      } else {
        this.service = this.dashboardService.searchCount({ fromDate: fromDate, toDate: toDate });
      }
    }
    this.service.subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.searchcounts = response.data;
        console.log(this.searchcounts);
        if (this.userstoragedata.roleid !== 3 && this.userstoragedata.roleid !== 2) {
          this.generateCatCountChart(this.searchcounts.map((d) => {
            return {
              category: d.categoryname,
              name: d.count
            };
          }));
        }
      }
    }, err => {
      console.log(err);
    });
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
        'bulletColor': '#004dff ',
        'lineColor': '#004dff ',
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
