import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../../../app.constants';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-view-consumer',
  templateUrl: './view-consumer.component.html',
  styleUrls: ['./view-consumer.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class ViewConsumerComponent implements OnInit {
  date_displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: any;

  constructor() {
    this.date = new Date();
  }

  ngOnInit() {
  }

}
