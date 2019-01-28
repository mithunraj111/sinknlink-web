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
  buttontext = AppConstant.BUTTON_TXT.SAVE;

  eventForm: FormGroup;
  eventErrObj = AppMessages.VALIDATION.EVENT;
  errMessage;
  sucMessage;
  processingEvent;
  statelists = [];

  images: any = [];

  constructor(private localStorageService: LocalStorageService, private route: ActivatedRoute, private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService,
    private fb: FormBuilder, private eventService: EventService, private router: Router, private lookupService: LookupService) {

    this.eventForm = this.fb.group({
      eventname: [null, [Validators.required]],
      locationid: [null, [Validators.required]],
      eventdate: [null, [Validators.required]],
      eventexpirydt: [null, [Validators.required]],
      address: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });

  }

  ngOnInit() {
    this.lookupService.list({ refkey: 'biz_states', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.statelists = JSON.parse(response.data[0].refvalue);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }


  imageAdded(files) {
    this.images = files;
  };


  addEvent() {

    if (!this.eventForm.valid) {
      this.bootstrapAlertService.showError(this.commonService.getFormErrorMessage(this.eventForm, this.eventErrObj));
    } else {
      let form_data = this.eventForm.value;

      let data = form_data;

      data["eventdate"] = "2019-01-28T09:46:13.880Z";
      data["eventexpirydt"] = "2019-01-28T09:46:13.880Z";
      data["createddt"] = new Date();
      data["createdby"] = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;
      data["locationid"] = 123;

      let formData = new FormData();

      for (let index = 0; index < this.images.length; index++) {
        const element = this.images[index];
        formData.append("files", element.image);
      }

      formData.append("data", JSON.stringify(data));

      this.eventService.create(formData).subscribe(res => {
        this.bootstrapAlertService.showSucccess(res.message);
      }, err => {
        // this.bootstrapAlertService.showError(res.message);
        console.log(err);
      })

    }

  }
}
