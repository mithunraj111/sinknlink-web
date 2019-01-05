import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../../../app.constants';

@Component({
  selector: 'app-view-consumer',
  templateUrl: './view-consumer.component.html',
  styleUrls: ['./view-consumer.component.scss']
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
