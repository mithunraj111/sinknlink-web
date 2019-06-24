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
export class CustomerReviewsComponent implements OnInit {
    showInput = false;
    reviewsList = [];
    replyComment;
    replybox = false;
    replyForm: FormGroup;
    datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
    userstoragedata = {} as any;
    @Input() customerObj = {} as any;
    errObj = AppMessages.VALIDATION.REPLY;
    loadingIndicator = false;
    replyid;
    showDropdown = false;
    row: any;
    editCustomerReview;
    message;
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

    initform() {
        this.replyForm = this.fb.group({
            reply: [null, Validators.compose([Validators.required, Validators.maxLength(100)])]
        });
        this.getCustomerReviews(this.customerObj);
    }
    openOpt(event, id, reply?) {
        this.row = this.reviewsList.find((o) => {
            return id === o.reviewid;
        });
        if (reply === 'reply') {
            this.message = 'reply';
            this.editCustomerReview = this.row.reply.comments;
        } else {
            this.message = 'comment';
            this.editCustomerReview = this.row.comments;
        }
        document.querySelector('#' + event).classList.add('md-show');
    }
    closeOpt(event) {
        document.querySelector('#' + event).classList.remove('md-show');
    }
    savePayment(message) {
        const formdata = {} as any;
        formdata.comments = this.editCustomerReview;
        let service;
        if (message === 'comment') {
            service = this.reviewService.update(formdata, this.row.reviewid);
        } else if (message === 'reply') {
            service = this.reviewService.update(formdata, this.row.reply.reviewid);
        }
        service.subscribe(res => {
            const response = JSON.parse(res._body);
            if (response.status) {
                this.getCustomerReviews(this.customerObj);
            }
            this.bootstrapAlertService.showSucccess(response.message);
        });
        document.querySelector('#editReview').classList.remove('md-show');
    }
    deleteReview(id) {
        const confirmBox = confirm('Confirm Delete?');
        if (confirmBox === true) {
            const formdata = {} as any;
            formdata.status = AppConstant.STATUS_DELETED;
            this.reviewService.update(formdata, id).subscribe(res => {
                const response = JSON.parse(res._body);
                if (response.status) {
                    this.getCustomerReviews(this.customerObj);
                }
            });
        }
    }
    getCustomerReviews(customerObj) {
        this.reviewsList = [];
        this.loadingIndicator = true;
        if (!_.isEmpty(customerObj)) {
            this.reviewService.listMobile({ membershipid: customerObj.membershipid }).subscribe(res => {
                const response = JSON.parse(res._body);
                this.loadingIndicator = false;
                if (response.status) {
                    this.reviewsList = response.data;
                }
            });
        }
    }
    toReply(id) {
        this.replyComment = '';
        this.openModal('replyModal');
        this.replyid = id;
    }

    openModal(event) {
        document.querySelector('#' + event).classList.add('md-show');
    }
    closeModal(event) {
        document.querySelector('#' + event).classList.remove('md-show');
    }
    reply() {
        this.loadingIndicator = true;
        const data = {} as any;
        data.comments = this.replyComment;
        if (this.replyComment === null || this.replyComment === undefined || this.replyComment === '') {
            this.bootstrapAlertService.showError(this.errObj.reply.required);
            this.loadingIndicator = false;
            return;
        }
        if (this.replyComment.length > 100) {
            this.bootstrapAlertService.showError(this.errObj.reply.maxlength);
            this.loadingIndicator = false;
            return;
        }
        data.membershipid = this.customerObj.membershipid;
        data.updatedby = this.userstoragedata.fullname;
        data.parentreviewid = this.replyid;
        data.status = AppConstant.STATUS_ACTIVE;
        data.updateddt = new Date();
        this.reviewService.create(data).subscribe((res) => {
            const response = JSON.parse(res._body);
            this.bootstrapAlertService.showSucccess(response.message);
            this.loadingIndicator = false;
            this.getCustomerReviews(this.customerObj);
        });
    }
}
