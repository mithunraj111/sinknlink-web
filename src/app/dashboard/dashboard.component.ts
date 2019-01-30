import { Component, OnInit } from '@angular/core';
declare const AmCharts: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      AmCharts.makeChart('analythics-graph', {
        'type': 'serial',
        'theme': 'light',

        'dataDateFormat': 'YYYY-MM-DD',
        'precision': 2,
        'valueAxes': [{
          'id': 'v1',
          'title': 'Search',
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
        }, {
          'id': 'g2',
          'valueAxis': 'v2',
          'fillAlphas': 0.9,
          'bulletColor': '#FF5370 ',
          'lineThickness': 0,
          'lineColor': '#FF5370 ',
          'type': 'smoothedLine',
          'title': 'Search Count',
          'useLineColorForBulletBorder': true,
          'valueField': 'count',
          'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>'
        }

        ],
        'chartCursor': {
          'pan': true,
          'valueLineEnabled': true,
          'valueLineBalloonEnabled': true,
          'cursorAlpha': 0,
          'valueLineAlpha': 0.2
        },
        'categoryField': 'date',
        'categoryAxis': {
          'parseDates': true,
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
          'date': '2019-01-01',
          'count': 0,
        }, {
          'date': '2018-01-02',
          'count': 20,
        }, {
          'date': '2019-01-03',
          'count': 0,
        }, {
          'date': '2019-01-04',
          'count': 0,
        }, {
          'date': '2019-01-05',
          'count': 0,
        }, {
          'date': '2019-01-06',
          'count': 20,
        }, {
          'date': '2019-01-07',
          'count': 0,
        }]
      });
    });
  }
}
