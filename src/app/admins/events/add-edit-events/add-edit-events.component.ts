import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-add-edit-events',
  templateUrl: './add-edit-events.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-edit-events.component.scss']
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

  constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.eventid = params.id;
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
}
