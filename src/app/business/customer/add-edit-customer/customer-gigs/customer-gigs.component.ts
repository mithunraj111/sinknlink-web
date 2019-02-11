import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, Output } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { BusinessService, LocalStorageService, CommonService } from '../../../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../../../../app-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-customer-gigs',
  templateUrl: './customer-gigs.component.html'
})
export class CustomerGigsComponent implements OnInit, OnChanges {
  gigsList = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  userstoragedata = {} as any;
  @Input() customerObj = {} as any;
  gigForm: FormGroup;
  gigErrObj = AppMessages.VALIDATION.GIG;
  gigObj = {} as any;
  posttypes = AppConstant.POST_TYPES;
  constructor(private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
    private gigsService: BusinessService.GigsService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService) {
  }
  ngOnInit() {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
    this.initGigForm();
  }
  initGigForm() {
    this.gigForm = this.fb.group({
      postname: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      posttype: [null, Validators.required],
      salary: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9,]*-[0-9,]*$')])],
      contactperson: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      contactmobile: ['', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      description: ['', Validators.maxLength(500)],
      status: [true, Validators.required]
    });
    this.gigObj = {};
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getgigsList(changes.customerObj.currentValue);
  }
  getgigsList(customerObj) {
    if (!_.isEmpty(customerObj)) {
      this.gigsService.list({ membershipid: customerObj.membershipid }).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.gigsList = response.data;
          this.tempFilter = this.gigsList;
        }
      });
    }
  }
  search(event?) {
    this.gigsList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
  updategigStatus(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    this.updateGig(updateObj, index, flag);
  }
  updateGig(data, index, flag) {
    this.gigsService.update(data, this.gigObj.gigid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (flag) {
          this.bootstrapAlertService.showSucccess('#' + this.gigObj.gigid + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
          this.gigsList.splice(index, 1);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
          this.gigsList[index].status = response.data.status;
          this.initGigForm();
        }
        this.gigsList = [...this.gigsList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  editGig(data) {
    this.gigObj = data;
    this.gigForm.patchValue(this.gigObj);
  }

  saveOrUpdateGig() {
    let errMessage: any;
    if (_.isEmpty(this.customerObj)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.BUSINESS.common);
      return false;
    } else {
      if (this.gigForm.status === AppConstant.STATUS_INVALID) {
        errMessage = this.commonService.getFormErrorMessage(this.gigForm, this.gigErrObj);
        this.bootstrapAlertService.showError(errMessage);
        return false;
      } else {
        const data = this.gigForm.value;
        const formdata = { ...data } as any;
        formdata.membershipid = this.customerObj.membershipid;
        formdata.updatedby = this.userstoragedata.fullname;
        formdata.updateddt = new Date();
        if (!_.isUndefined(this.gigObj) && !_.isUndefined(this.gigObj.gigid) && !_.isEmpty(this.gigObj)) {
          formdata.status = data.status;
          const index = _.indexOf(this.gigsList, this.gigObj);
          this.updateGig(formdata, index, false);
        } else {
          formdata.status = AppConstant.STATUS_ACTIVE;
          formdata.createdby = this.userstoragedata.fullname;
          formdata.createddt = new Date();
          this.gigsService.create(formdata).subscribe((res) => {
            const response = JSON.parse(res._body);
            if (response.status) {
              this.bootstrapAlertService.showSucccess(response.message);
              this.initGigForm();
            } else {
              this.bootstrapAlertService.showError(response.message);
            }
          }, err => {
            this.bootstrapAlertService.showError(err.message);
          });
        }
      }
    }
  }
}
