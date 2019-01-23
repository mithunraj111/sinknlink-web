import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/services/masters/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: any;
  public data: any;
  tempFilter = [];
  userList = [];
  buttontext: string;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  addUsers() {
    this.router.navigate(['masters/users/create']);
    this.buttontext = AppConstant.BUTTON_TXT.SAVE;
  }
  editUsers(data) {
    this.router.navigate(['masters/users/edit/' + 1]);
    this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
  }

  getUsers() {
    this.userService.list({status: 'Active'}).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.userList = response.data;
      }
    });
  }
  getRowHeight(row) {
    return row.height;
  }
  search(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempFilter.filter(item => {
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.userList = temp;
    this.table.offset = 0;
  }
}
