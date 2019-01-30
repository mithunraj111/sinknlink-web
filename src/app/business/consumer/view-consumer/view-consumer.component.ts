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
  consumerCouponsList: any[] = [];
  consumerFavs: any = {
    business: [],
    category: [],
    location: []
  };

  constructor(private route: ActivatedRoute, private consumerService: ConsumerService) {
    this.date = new Date();
    this.route.params.subscribe(params => {
      let id = params.id;
      this.getConsumer(id);
      this.getConsumerCoupon(id);
      this.getConsumerFavs(id);
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
    this.consumerService.consumerCouponsList({ consumerid: parseInt(id) }).subscribe(res => {
      let response = JSON.parse(res._body);
      this.consumerCouponsList = response.data;
    }, err => {
      console.log(err);
    })
  }

  getConsumerFavs(id) {
    this.consumerService.consumerFavs({ consumerid: parseInt(id) }).subscribe(res => {
      let response = JSON.parse(res._body);
      this.consumerFavs = this.groupFavs(response.data);
    }, err => {
      console.log(err);
    })
  }

  groupFavs(data) {
    let groups = {
      business: [],
      category: [],
      location: []
    }
    data.forEach(element => {
      if (parseInt(element.membershipid)) {
        groups.business.push(element)
      }
      if (parseInt(element.locationid)) {
        groups.location.push(element)
      }
      if (parseInt(element.categoryid)) {
        groups.category.push(element)
      }
    });
    return groups;
  }

}
