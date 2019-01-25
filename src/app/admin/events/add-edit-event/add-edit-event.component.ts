import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { AppMessages } from 'src/app/app-messages';

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
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  isaddForm = true;
  eventid: number;
  buttontext = AppConstant.BUTTON_TXT.SAVE;

  eventForm: FormGroup;
  eventErrObj = AppMessages.VALIDATION.EVENT;
  errMessage;
  sucMessage;
  processingEvent;
  statelists = [];

  constructor(private route: ActivatedRoute, private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService,
    private fb: FormBuilder, private router: Router) {

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
    this.commonService.getLookUp({ refkey: "biz_states", status: "Active" }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.statelists = JSON.parse(response.data[0].refvalue);
        console.log(response);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    })
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  url = '';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { 

      }
    }
  }


  submit() {

    if (!this.eventForm.valid) {
      this.bootstrapAlertService.showError(this.commonService.getFormErrorMessage(this.eventForm, this.eventErrObj));
    } else {
      console.log(this.eventForm.value);
    }
  
  }
}
