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

  constructor(private route: ActivatedRoute, private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService,
    private fb: FormBuilder, private router: Router, private lookupService: LookupService) {

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
    console.log(this.images);
  };


  submit() {

    if (!this.eventForm.valid) {
      this.bootstrapAlertService.showError(this.commonService.getFormErrorMessage(this.eventForm, this.eventErrObj));
    } else {
      console.log(this.eventForm.value);
    }

  }
}
