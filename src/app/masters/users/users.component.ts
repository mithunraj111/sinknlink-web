import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
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
  buttontext: string;

  constructor(private router: Router) {
    this.data = [
      { fullname: 'Mithunraj', mobileno: '9874563210', role: 'Admin', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { fullname: 'Raj', mobileno: '9876543210', role: 'Manager', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { fullname: 'Mithunraj', mobileno: '9517538426', role: 'Operator', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { fullname: 'Mithunraj', mobileno: '9874563210', role: 'Admin', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { fullname: 'Raj', mobileno: '9876543210', role: 'Manager', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { fullname: 'Mithunraj', mobileno: '9517538426', role: 'Operator', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { fullname: 'Mithunraj', mobileno: '9874563210', role: 'Admin', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { fullname: 'Raj', mobileno: '9876543210', role: 'Manager', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { fullname: 'Mithunraj', mobileno: '9874563210', role: 'Admin', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { fullname: 'Raj', mobileno: '9876543210', role: 'Manager', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { fullname: 'Raj', mobileno: '9876543210', role: 'Manager', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { fullname: 'Mithunraj', mobileno: '9517538426', role: 'Operator', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' }
    ];
  }

  ngOnInit() {
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

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  addUsers() {
    this.router.navigate(['masters/users/create']);
    this.buttontext= AppConstant.BUTTON_TXT.SAVE;
  }
  editUsers(data) {
    this.router.navigate(['masters/users/edit/' + 1]);
    this.buttontext= AppConstant.BUTTON_TXT.UPDATE;
  }
}
