import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CommonService } from '../../../services/common.service';
import { AppMessages } from '../../../app-messages';
import { DonationService } from '../../../services/admin/donation.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-add-edit-donation',
  templateUrl: './add-edit-donation.component.html',
  styleUrls: ['./add-edit-donation.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class AddEditDonationComponent implements OnInit {
  userstoragedata = {} as any;
  isaddForm = true;
  donationid: number;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  donationForm: FormGroup;
  errMessage;
  donationErrObj = AppMessages.VALIDATION.DONATION;
  donationObj = {} as any;
  validatingDonation;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private bootstrapAlertService: BootstrapAlertService,
    private localStorageService: LocalStorageService, private commonService: CommonService,
    private donationService: DonationService) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.donationid = params.id;
        this.getIdDonation();
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
      }
    });
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.donationForm = this.fb.group({
      charityname: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      startdate: [new Date(), Validators.compose([Validators.required])],
      enddate: [null, Validators.compose([Validators.required])],
      amount: [''],
      causeremarks: ['', Validators.compose([Validators.maxLength(500)])],
      status: [true],
    });
  }

  saveOrUpdateDonation() {
    let errorMessage: any;
    if (this.donationForm.status === 'INVALID') {
      this.errMessage = this.commonService.getFormErrorMessage(this.donationForm, this.donationErrObj);
      this.bootstrapAlertService.showError(this.errMessage);
      return false;
    }
    else {
      this.validatingDonation = true;
      let data = this.donationForm.value;
      let formdata = {} as any;
      formdata.charityname = data.charityname;
      formdata.causeremarks = data.causeremarks;
      formdata.startdate = data.startdate.year + '-' + data.startdate.month + '-' + data.startdate.day;
      formdata.enddate = data.enddate.year + '-' + data.enddate.month + '-' + data.enddate.day;
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
      if (!_.isUndefined(this.donationObj) && !_.isUndefined(this.donationObj.donationid) && !_.isEmpty(this.donationObj)) {
        formdata.status = data.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
        this.donationService.update(formdata, this.donationObj.donationid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.validatingDonation = false;
            this.bootstrapAlertService.showSucccess(response.message);
          } else {
            this.bootstrapAlertService.showError(response.message);
            this.validatingDonation = true;

          }
        }, err => {
          this.bootstrapAlertService.showError(err.message);
        });
      } else {
        formdata.status = AppConstant.STATUS_ACTIVE;
        formdata.createdby = this.userstoragedata.fullname;
        formdata.createddt = new Date();
        this.donationService.create(formdata).subscribe((res) => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
          } else {
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.bootstrapAlertService.showError(err.message);
        });
      }

    }
  }
  getIdDonation() {
    this.donationService.byId(this.donationid).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.donationObj = response.data;
        let date = new Date(this.donationObj.startdate);
        this.donationForm = this.fb.group({
          charityname: [this.donationObj.charityname, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
          startdate: [{ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getUTCDate() }, Validators.compose([Validators.required])],
          enddate: [{ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getUTCDate() }, Validators.compose([Validators.required])],
          amount: [this.donationObj.amount],
          causeremarks: [this.donationObj.causeremarks, Validators.compose([Validators.maxLength(500)])],
          status: [this.donationObj.status === AppConstant.STATUS_ACTIVE ? true : false, Validators.compose([Validators.required])]
        });
      }
    }, err => {
      this.bootstrapAlertService.showError(err.message);
    });
  }

}
