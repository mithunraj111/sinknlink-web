import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConstant } from '../../../app.constants';
import { fadeInOutTranslate } from '../../../../assets/animations/fadeInOutTranslate';
import { ActivatedRoute } from '@angular/router';
import { ConsumerService } from 'src/app/services/business/consumer.service';
import * as Lodash from 'lodash';
import { element } from '@angular/core/src/render3/instructions';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CommonService } from '../../../services';

@Component({
  selector: 'app-view-consumer',
  templateUrl: './view-consumer.component.html',
  styleUrls: ['./view-consumer.component.scss'],
  animations: [fadeInOutTranslate]
})
export class ViewConsumerComponent implements OnInit {
  @ViewChild(DatatableComponent) eventtable: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  datetimedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  consumerProfilepic: any;
  tempFilter = [];
  emptymessages = AppConstant.EMPTY_MESSAGES.CONSUMERCOUPONS;
  nodata = AppConstant.EMPTY_MESSAGES.FAVOURITES;
  showCategoryImage = 'http://180.12.181.8:2000/category/';
  showRating = false;
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
  userimg: any = {};

  // For Reviews
  reviewedBiz: any = [];
  reviews: any = {};
  selectedReview: number;
  bizReview: any = [];
  public rateStar = '';

  constructor(private route: ActivatedRoute, private consumerService: ConsumerService, private commonService: CommonService) {
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
  search(event?) {
    this.consumerCouponsList = this.commonService.globalSearch(this.tempFilter, event);
    this.eventtable.offset = 0;
  }
  getConsumer(id) {
    this.consumerService.byId(id).subscribe(res => {
      const response = JSON.parse(res._body);
      this.consumer = response.data;
      if (this.consumer.user.profileimg != null) {
        this.consumerProfilepic = this.consumer.user.profileimg.docurl;
      } else {
        this.consumerProfilepic = 'assets/images/avatar-blank.png';
      }
    }, err => {
    });
  }

  getConsumerCoupon(id) {
    this.consumerService.consumerCouponsList({ consumerid: Number(id) }).subscribe(res => {
      const response = JSON.parse(res._body);
      this.consumerCouponsList = response.data;
      this.tempFilter = this.consumerCouponsList;
    }, err => {
    });
  }
  getConsumerFavs(id) {
    this.consumerService.consumerFavs({ consumerid: Number(id), status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      this.consumerFavs = this.groupFavs(response.data);
    }, err => {
    })
  }

  getConsumerReviews(id) {
    this.consumerService.consumerReviews({ consumerid: Number(id) }).subscribe(res => {
      const response = JSON.parse(res._body);
      const businesses = [] as any;
      let reviews = {};
      if (response.data.length > 0) {
        response.data.forEach(element => {
          if (Lodash.find(businesses, function (o) { return o.membershipid == element.membershipid }) == undefined) businesses.push({ membershipid: element.membershipid, bizname: element.business == null ? "" : element.business.bizname });
        });
        reviews = Lodash.groupBy(response.data, 'membershipid');
        this.reviewedBiz = businesses;
        this.reviews = reviews;
      }

    }, err => {
    });
  }

  showReviewFor(id) {
    this.bizReview = this.reviews[id].sort(function (a, b) { return a.reviewid - b.reviewid })[0];
    this.rateStar = this.bizReview.rating;
    this.showRating = true;
  }

  groupFavs(data) {
    let groups = {
      business: [],
      category: [],
      location: []
    };
    data.forEach(element => {
      if (Number(element.membershipid)) {
        groups.business.push(element);
      }
      if (Number(element.locationid)) {
        groups.location.push(element);
      }
      if (Number(element.categoryid)) {
        groups.category.push(element);
      }
    });
    return groups;
  }
}
