import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-add-edit-events',
  templateUrl: './add-edit-events.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-edit-events.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class AddEditEventsComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  isaddForm = true;
  eventid: number;
  buttontext = AppConstant.BUTTON_TXT.SAVE;

  constructor(private route: ActivatedRoute,private bootstrapAlertService: BootstrapAlertService) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.eventid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
      }
    });
  }

  ngOnInit() {
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

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.url = event.target.result;

      }
      console.log(event.target.result);
    }
  }


  submit(){
    // this.bootstrapAlertService.showError('This is an error!');
    // this.bootstrapAlertService.showInfo('This is an info!');    
    // this.bootstrapAlertService.showWarning('This is a warning!');    
    this.bootstrapAlertService.showSucccess('This is a success message!');
}
}
