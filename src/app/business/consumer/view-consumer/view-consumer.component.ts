import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../../../app.constants';
import { fadeInOutTranslate } from '../../../../assets/animations/fadeInOutTranslate';
import { ActivatedRoute } from '@angular/router';
import { ConsumerService } from 'src/app/services/business/consumer.service';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-view-consumer',
  templateUrl: './view-consumer.component.html',
  styleUrls: ['./view-consumer.component.scss'],
  animations: [fadeInOutTranslate]
})
export class ViewConsumerComponent implements OnInit {
  date_displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: any;
  userfile: any;
  categorydoc: any;
  emptymessages = AppConstant.EMPTY_MESSAGES.CONSUMERCOUPONS;
  nodata = AppConstant.EMPTY_MESSAGES.FAVOURITES;
  // For Consumer Details.
  consumer: any = {};

  // For Consumer Coupons
  consumerCouponsList: any[] = [];

  // For Consumer Coupon Favs
  consumerFavs: any = {
    business: [],
    category: [],
    location: []
  };

  // For Reviews
  reviewedBiz: any = [];
  reviews: any = {};
  selectedReview: number;
  bizReview: any = [];
  public rateStar = '';

  constructor(private route: ActivatedRoute, private consumerService: ConsumerService) {
    this.date = new Date();
    this.route.params.subscribe(params => {
      let id = params.id;
      this.getConsumer(id);
      this.getConsumerCoupon(id);
      this.getConsumerFavs(id);
      this.getConsumerReviews(id);
    });
  }

  ngOnInit() {
  }

  getConsumer(id) {
    this.consumerService.byId(id).subscribe(res => {
      let response = JSON.parse(res._body);
      this.consumer = response.data;
      if (this.consumer.profileimg != null) {
        this.userfile =  this.consumer.profileimg.docurl;
      } else {
        this.userfile = 'assets/images/avatar-blank.png';
      }
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

  getConsumerReviews(id) {
    this.consumerService.consumerReviews({ consumerid: parseInt(id) }).subscribe(res => {
      let response = JSON.parse(res._body);

      let businesses = [];
      let reviews = {};

      if (response.data.length > 0) {
        response.data.forEach(element => {
          if (Lodash.find(businesses, function (o) { return o.membershipid == element.membershipid }) == undefined) businesses.push({ membershipid: element.membershipid, bizname: element.business.bizname });
        });
        reviews = Lodash.groupBy(response.data, 'membershipid');
        this.reviewedBiz = businesses;
        this.reviews = reviews;
        

      }
    }, err => {
      console.log(err);
    })
  }

  showReviewFor(id) {
    this.bizReview = this.reviews[id].sort(function (a, b) { return a.reviewid - b.reviewid })[0];
    this.rateStar = this.bizReview.rating;
  }

  groupFavs(data) {
    let groups = {
      business: [],
      category: [],
      location: [],
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

      console.log(this.categorydoc)
    });
    return groups;
  }

}
