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
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-edit-event.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class AddEditEventComponent implements OnInit {

  isaddForm = true;
  eventid: number;
  edit:boolean = false;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  status: boolean = true;

  savingEvent: boolean = false;

  eventForm: FormGroup;
  eventErrObj = AppMessages.VALIDATION.EVENT;
  errMessage;
  sucMessage;
  processingEvent;
  statelists = [];

  images: any = [];
  existing_image:any = [];

  constructor(private localStorageService: LocalStorageService, private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService,
    private fb: FormBuilder, private route: ActivatedRoute, private eventService: EventService, private router: Router, private lookupService: LookupService) {

    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.eventid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
        this.getEventDetail(this.eventid);
      }
    })

    this.eventForm = this.fb.group({
      eventname: [null, [Validators.required]],
      locationid: [null, [Validators.required]],
      eventdate: [null, [Validators.required]],
      eventexpirydt: [null, [Validators.required]],
      address: [null, [Validators.required]],
      description: [null, [Validators.required]],
      status: ['Active']
    });

  }

  ngOnInit() {
    this.eventService.getLocations({ status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.statelists = response.data;
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
      console.log(err);
    });
  }

  getEventDetail(id) {
    this.eventService.byId(id).subscribe(res => {
      let response = JSON.parse(res._body);
      this.eventForm.setValue({
        eventname: response.data.eventname,
        locationid: response.data.locationid,
        eventdate: this.commonService.parseDate(response.data.eventdate),
        eventexpirydt: this.commonService.parseDate(response.data.eventexpirydt),
        address: response.data.address,
        description: response.data.description,
        status: response.data.status == AppConstant.STATUS_ACTIVE ? true : false
      });
      this.existing_image = [];
      this.existing_image = response.data.gallery;
      console.log(this.existing_image);
    }, err => {
      this.savingEvent = false;
      console.log(err);
    });
  }


  imageAdded(files) {
    this.images = files;
  };


  addEvent() {
    this.savingEvent = true;

    if (this.edit) {
      this.updateEvent();
    } else {
      if (!this.eventForm.valid) {
        this.savingEvent = false;
        this.bootstrapAlertService.showError(this.commonService.getFormErrorMessage(this.eventForm, this.eventErrObj));
      } else {
        let form_data = this.eventForm.value;

        let data = form_data;

        data["eventdate"] = this.commonService.formatDate(data["eventdate"]);
        data["eventexpirydt"] = this.commonService.formatDate(data["eventexpirydt"]);
        data["createddt"] = new Date();
        data["createdby"] = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;

        let formData = new FormData();

        for (let index = 0; index < this.images.length; index++) {
          const element = this.images[index];
          formData.append("files", element.image);
        }

        formData.append("data", JSON.stringify(data));

        this.eventService.create(formData).subscribe(res => {
          this.savingEvent = false;
          let response = JSON.parse(res._body);
          if (response.status) this.bootstrapAlertService.showSucccess(response.message);
          else this.bootstrapAlertService.showError(response.message);
        }, err => {
          this.savingEvent = false;
          console.log(err);
        });

      }
    }

  }

  updateEvent() {
    if (!this.eventForm.valid) {
      this.savingEvent = false;
      this.bootstrapAlertService.showError(this.commonService.getFormErrorMessage(this.eventForm, this.eventErrObj));
    } else {
      let form_data = this.eventForm.value;

      let data = form_data;

      data["eventdate"] = this.commonService.formatDate(data["eventdate"]);
      data["eventexpirydt"] = this.commonService.formatDate(data["eventexpirydt"]);
      data["createddt"] = new Date();
      data["createdby"] = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;

      let formData = new FormData();

      for (let index = 0; index < this.images.length; index++) {
        const element = this.images[index];
        formData.append("files", element.image);
      }

      formData.append("data", JSON.stringify(data));

      this.eventService.create(formData).subscribe(res => {
        this.savingEvent = false;
        let response = JSON.parse(res._body);
        if (response.status) this.bootstrapAlertService.showSucccess(response.message);
        else this.bootstrapAlertService.showError(response.message);
      }, err => {
        this.savingEvent = false;
        console.log(err);
      });

    }
  }
}
