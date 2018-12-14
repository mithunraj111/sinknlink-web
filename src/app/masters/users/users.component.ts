import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploader } from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;

  public data: any;
  // public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public userProPic: string;

  @Input('modalDefault') modalDefault: any;

  constructor(public http: Http) {
    this.data=[
      { fullname:'Mithunraj', mobileno:'9874563210', role:'Admin', updatedby:'Admin', updateddt:'02/12/2018' },
      { fullname:'Raj', mobileno:'9876543210', role:'Manager', updatedby:'Admin', updateddt:'10/08/2018' },
      { fullname:'Mithunraj', mobileno:'9517538426', role:'Operator', updatedby:'Admin', updateddt:'20/12/2018' }
    ]
   }

  ngOnInit() {
    this.http.get(`assets/data/crm-contact.json`)
      .subscribe((data) => {
        this.data = data.json();
      });
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  openMyModalData(event) {
    this.userProPic = this.data[event]['image'];
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  // fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }

  // fileOverAnother(e: any): void {
  //   this.hasAnotherDropZoneOver = e;
  // }
  
}
