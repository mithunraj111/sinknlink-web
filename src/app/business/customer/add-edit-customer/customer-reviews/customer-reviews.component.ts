import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AppConstant } from '../../../../app.constants';
import { AppMessages } from '../../../../app-messages';
import { BusinessService, LocalStorageService, CommonService } from '../../../../services';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

@Component({
    selector: 'app-customer-reviews',
    templateUrl: './customer-reviews.component.html'
})
export class CustomerReviewsComponent implements OnInit, OnChanges {
    reviewsList = [];
    replybox = false;
    replyForm: FormGroup;
    datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
    userstoragedata = {} as any;
    @Input() customerObj = {} as any;
    errObj = AppMessages.VALIDATION.REPLY;
    loadingIndicator = false;
    constructor(
        private reviewService: BusinessService.ReviewsService,
        private localStorageService: LocalStorageService,
        private fb: FormBuilder,
        private commonService: CommonService,
        private bootstrapAlertService: BootstrapAlertService) {
    }
    ngOnInit() {
        this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
        this.initform();
    }
    ngOnChanges(changes: SimpleChanges) {
        this.getCustomerReviews(changes.customerObj.currentValue);
    }
    initform() {
        this.replyForm = this.fb.group({
            reply: [null, Validators.required]
        });
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
    reply(i) {
        if (!this.replyForm.valid) {
            this.bootstrapAlertService.showError(this.errObj.reply.required);
            return false;
        } else {
            this.loadingIndicator = true;
            const data = {} as any;
            data.comments = this.replyForm.value.reply;
            if (this.reply == null) {
                this.bootstrapAlertService.showError(this.errObj.reply.required);
            }
            data.membershipid = this.customerObj.membershipid;
            data.updatedby = this.userstoragedata.fullname;
            data.parentreviewid = i;
            data.status = 'Active';
            data.updateddt = new Date();
            this.reviewService.create(data).subscribe((res) => {
                 const response = JSON.parse(res._body);
                 this.bootstrapAlertService.showSucccess(response.message);
            });
            this.loadingIndicator = false;
            this.getCustomerReviews(this.customerObj);
        }
    }
}
