import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AppConstant } from '../../../../app.constants';
import { BusinessService, LocalStorageService } from '../../../../services';
import * as _ from 'lodash';
@Component({
    selector: 'app-customer-reviews',
    templateUrl: './customer-reviews.component.html'
})
export class CustomerReviewsComponent implements OnInit, OnChanges {
    reviewsList = [];
    datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
    userstoragedata = {} as any;
    @Input() customerObj = {} as any;
    emptymessages = AppConstant.EMPTY_MESSAGES.GIGS;
    loadingIndicator = false;
    constructor(
        private reviewService: BusinessService.ReviewsService,
        private localStorageService: LocalStorageService) {
    }
    ngOnInit() {
        this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
    }
    ngOnChanges(changes: SimpleChanges) {
        this.getCustomerReviews(changes.customerObj.currentValue);
    }
    getCustomerReviews(customerObj) {
        this.loadingIndicator = true;
        if (!_.isEmpty(customerObj)) {
            this.reviewService.list({ membershipid: customerObj.membershipid }).subscribe(res => {
                const response = JSON.parse(res._body);
                this.loadingIndicator = false;
                if (response.status) {
                    this.reviewsList = response.data;
                }
            });
        }
    }
}
