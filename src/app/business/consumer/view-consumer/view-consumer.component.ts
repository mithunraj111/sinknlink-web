import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../../../app.constants';
import { fadeInOutTranslate } from '../../../../assets/animations/fadeInOutTranslate';
import { ActivatedRoute } from '@angular/router';
import { ConsumerService } from 'src/app/services/business/consumer.service';

@Component({
  selector: 'app-view-consumer',
  templateUrl: './view-consumer.component.html',
  styleUrls: ['./view-consumer.component.scss'],
  animations: [fadeInOutTranslate]
})
export class ViewConsumerComponent implements OnInit {
  date_displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: any;

  consumer: any = {};
  consumerCouponsList:any[] = [];

  constructor(private route: ActivatedRoute, private consumerService: ConsumerService) {
    this.date = new Date();
    this.route.params.subscribe(params => {
      this.getConsumer(params.id);
      this.getConsumerCoupon(params.id);
    });
  }

  ngOnInit() {
  }

  getConsumer(id) {
    this.consumerService.byId(id).subscribe(res => {
      let response = JSON.parse(res._body);
      this.consumer = response.data;
    }, err => {
      console.log(err);
    })
  }

  getConsumerCoupon(id) {
    this.consumerService.couponsList({ consumerid: parseInt(id) }).subscribe(res => {
      let response = JSON.parse(res._body);
      this.consumerCouponsList = response.data;
    }, err => {
      console.log(err);
    })
  }

}
