import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppMessages } from '../../../app-messages';
import { CommonService } from '../../../services/common.service';
import { AppConstant } from '../../../app.constants';
import * as _ from 'lodash';
import { LocationService } from '../../../services/masters/location.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { LookupService } from '../../../services/admin/lookup.service';

@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.scss']
})
export class AddEditLocationComponent implements OnInit, OnChanges {
  locationForm: FormGroup;
  locationErrObj = AppMessages.VALIDATION.LOCATION;
  errMessage;
  validatingLocation;
  locationid: number;
  formTitle = AppConstant.FORM_TITLE.CATEGORY.ADD;
  buttonTxt = AppConstant.BUTTON_TXT.SAVE;
  @Output() notifyLocationEntry: EventEmitter<any> = new EventEmitter();
  @Input() locationObj = {} as any;
  userstoragedata = {} as any;
  stateList = [];
  constructor(
    private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private locationService: LocationService,
    private lookupService: LookupService) {
      this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.initForm();
    this.getStateNames();
  }
  getStateNames() {
    this.lookupService.list({ refkey: 'biz_states', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.stateList = JSON.parse(response.data[0].refvalue);
      } else {
        this.stateList = [];
      }
    });
  }
  initForm() {
    this.locationForm = this.fb.group({
      pincode: [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      area: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      state: [null, Validators.required],
      city: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      status: ['']
    });
    this.locationObj = {};
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!_.isUndefined(changes.locationObj) && !_.isEmpty(changes.locationObj.currentValue)) {
      this.validatingLocation = false;
      this.buttonTxt = AppConstant.BUTTON_TXT.UPDATE;
      this.formTitle = AppConstant.FORM_TITLE.LOCATION.UPDATE;
      this.locationObj = changes.locationObj.currentValue;
      this.locationForm = this.fb.group({
        pincode: [this.locationObj.pincode, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
        area: [this.locationObj.area, Validators.compose([Validators.required, Validators.maxLength(50)])],
        state: [this.locationObj.state, Validators.required],
        city: [this.locationObj.city, Validators.compose([Validators.required, Validators.maxLength(50)])],
        status: [this.locationObj.status]
      });
    } else {
      this.validatingLocation = false;
      this.initForm();
      this.buttonTxt = AppConstant.BUTTON_TXT.SAVE;
      this.formTitle = AppConstant.FORM_TITLE.LOCATION.ADD;
    }
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  saveOrUpdateLocation() {
    if (this.locationForm.status === AppConstant.STATUS_INVALID) {
      this.errMessage = this.commonService.getFormErrorMessage(this.locationForm, this.locationErrObj);
      this.bootstrapAlertService.showError(this.errMessage);
      return false;
    } else {
      let data = this.locationForm.value;
      let formdata = {} as any;
      formdata.pincode = data.pincode;
      formdata.area = data.area;
      formdata.state = data.state;
      formdata.city = data.city;
      formdata.updatedby = this.userstoragedata.fullname;
      formdata.updateddt = new Date();
      if (!_.isUndefined(this.locationObj) && !_.isUndefined(this.locationObj.locationid) && !_.isEmpty(this.locationObj)) {
        formdata.status = data.status;
        this.locationService.update(formdata, this.locationObj.locationid).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.notifyLocationEntry.emit(response.data);
          } else {
            this.bootstrapAlertService.showError(response.message);
          }
        }, err => {
          this.validatingLocation = false;
          this.bootstrapAlertService.showError(err.message);
        });
      } else {
        formdata.status = AppConstant.STATUS_ACTIVE;
        formdata.createdby = this.userstoragedata.fullname;
        formdata.createddt = new Date();
        this.locationService.create(formdata).subscribe((res) => {
          this.validatingLocation = false;
          const response = JSON.parse(res._body);
          if (response.status) {
            this.bootstrapAlertService.showSucccess(response.message);
            this.notifyLocationEntry.emit(response.data);
            this.closeMyModal('locationmodal');
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
