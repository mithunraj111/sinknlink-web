import { ChangeDetectionStrategy, Component, OnInit, Input, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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

  columns = [
    { prop: 'fullname', name: 'FullName' },
    { prop: 'mobileno', name: 'Mobile No' },
    { prop: 'role', name: 'Role' },
    { prop: 'updatedby', name: 'CreatedBy' },
    { prop: 'status', name: 'Status' },
    { prop: 'action', name: 'Action' }
  ];

  tempFilter = [];

  @Input('modalDefault') modalDefault: any;
  buttontext: string;
  @ViewChild(DatatableComponent) table: DatatableComponent;

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
    this.tempFilter = this.data;

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
    this.buttontext = AppConstant.BUTTON_TXT.SAVE;
  }
  editUsers(data) {
    this.router.navigate(['masters/users/edit/' + 1]);
    this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
  }
  fetchFilterData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
  search(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempFilter.filter(item => {
      for (let key in item) {
        if (("" + item[key]).toLocaleLowerCase().includes(val)) {
          return ("" + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.data = temp;
    this.table.offset = 0;
  }


}