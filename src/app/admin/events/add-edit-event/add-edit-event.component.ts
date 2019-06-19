import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { AppMessages } from 'src/app/app-messages';
import { LookupService } from 'src/app/services/admin/lookup.service';
import { EventService } from 'src/app/services/admin/event.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class AddEditEventComponent implements OnInit {

  isaddForm = true;
  eventid: number;
  edit = false;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  status = true;
  eventObj = {} as any;
  savingEvent = false;
  mallsList = [];
  cityList = [];

  eventForm: FormGroup;
  eventErrObj = AppMessages.VALIDATION.EVENT;
  errMessage;
  sucMessage;
  processingEvent;
  statelists = [];
  cityName: string;

  images: any = [];
  existing_image: any = [];
  limit = AppConstant.MAX_FILE_COUNT;
  lookupList: any = [];

  constructor(private localStorageService: LocalStorageService,
    private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
    private fb: FormBuilder, private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private lookupService: LookupService) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.eventid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
        this.getEventDetail(this.eventid);
      }
    });
  }
  ngOnInit() {
    this.initEventForm();
    this.getCity();
  }
  getCity() {
    this.lookupService.list({ refkey: 'biz_businesscity', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.refname;
          item.value = item.refvalue;
        });
        this.cityList = this.cityList.concat(response.data);
      }
    });
  }
  selectCity(option) {
    this.cityName = option.value;
    this.mallsList = [];
    this.lookupList.forEach(element => {
      if (element.refname === option.value) {
        this.mallsList.push(element);
      }
    });
    this.eventForm.get('locationid').setValidators(Validators.required);
    this.eventForm.get('locationid').updateValueAndValidity();
    this.getLocations();
  }
  getLocations() {
    this.eventService.getLocations({ city: this.cityName, status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.value = item.locationid.toString();
          item.label = item.area + ' ( ' + (item.pincode || '-') + ' )';
        });
        this.statelists = response.data;
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
      console.log(err);
    });
  }
  initEventForm() {
    this.eventForm = this.fb.group({
      eventname: [null, Validators.compose([Validators.required,
      Validators.maxLength(50)])],
      city: [null, Validators.required],
      locationid: [null, [Validators.required]],
      eventdate: [null, [Validators.required]],
      eventexpirydt: [null, [Validators.required]],
      address: [null, Validators.compose([Validators.required,
      Validators.maxLength(100)])],
      description: [null, Validators.compose([Validators.required,
      Validators.maxLength(500)])],
      status: ['Active']
    });
  }
  getEventDetail(id) {
    this.eventService.byId(id).subscribe(res => {
      this.edit = true;
      let response = JSON.parse(res._body);
      let eventObj = response.data;
      eventObj.locationid = eventObj.locationid.toString();
      eventObj.eventdate = this.commonService.parseDate(eventObj.eventdate);
      eventObj.eventexpirydt = this.commonService.parseDate(eventObj.eventexpirydt);
      eventObj.status = response.data.status == AppConstant.STATUS_ACTIVE ? true : false;
      this.eventForm = this.fb.group({
        eventname: [eventObj.eventname, [Validators.required]],
        city: [eventObj.location.city, Validators.required],
        locationid: [eventObj.locationid, [Validators.required]],
        eventdate: [eventObj.eventdate, [Validators.required]],
        eventexpirydt: [eventObj.eventexpirydt, [Validators.required]],
        address: [eventObj.address, [Validators.required]],
        description: [eventObj.description, [Validators.required]],
        status: [eventObj.status]
      });
      this.existing_image = [];
      this.existing_image = response.data.gallery;
    }, err => {
      this.savingEvent = false;
      console.log(err);
    });
    this.getLocations();
  }
  imageAdded(files) {
    this.images = files;
  }
  addEvent() {
    this.savingEvent = true;
    if (!this.eventForm.valid) {
      this.savingEvent = false;
      this.bootstrapAlertService.showError(this.commonService.getFormErrorMessage(this.eventForm, this.eventErrObj));
      return false;
    }
    const data = this.eventForm.value;
    const startdt = this.commonService.formatDate(data.eventdate);
    const enddt = this.commonService.formatDate(data.eventexpirydt);
    data.status = data.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
    let eventdt = new Date(startdt);
    let eventstartdt = eventdt.setHours(23, 59, 59);
    if (new Date(eventstartdt) < this.commonService.getCurrentDate()) {
      this.savingEvent = false;
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.EVENT.eventdate.min);
      return false;
    } else if (new Date(enddt) < new Date(startdt)) {
      this.savingEvent = false;
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.EVENT.eventdate.max);
      return false;
    } else if (this.edit) {
      data['eventdate'] = startdt;
      data['eventexpirydt'] = enddt;
      data['updateddt'] = new Date();
      data['updatedby'] = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;
      this.updateEvent(data);
    } else {
      data.eventdate = startdt;
      data.eventexpirydt = enddt;
      data.createddt = new Date();
      data.createdby = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;
      let formData = new FormData();
      for (let index = 0; index < this.images.length; index++) {
        const element = this.images[index];
        formData.append('files', element.image);
      }
      formData.append('data', JSON.stringify(data));
      this.eventService.create(formData).subscribe(res => {
        this.savingEvent = false;
        let response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.router.navigate(['/admin/events/']);
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      }, err => {
        this.savingEvent = false;
        console.log(err);
      });
    }
  }
  updateEvent(data) {
    let formData = new FormData();
    for (let index = 0; index < this.images.length; index++) {
      const element = this.images[index];
      formData.append('files', element.image);
    }
    formData.append('data', JSON.stringify(data));
    this.eventService.update(formData, this.eventid).subscribe(res => {
      this.savingEvent = false;
      let response = JSON.parse(res._body);
      if (response.status) {
        this.bootstrapAlertService.showSucccess(response.message);
        this.router.navigate(['/admin/events/']);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
      this.savingEvent = false;
    });
  }
}
