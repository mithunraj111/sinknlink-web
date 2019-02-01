import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/services/masters/user.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppMessages } from 'src/app/app-messages';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  tempFilter = [];
  userList = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private router: Router, private userService: UserService,
    private bootstrapAlertService: BootstrapAlertService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  addUser() {
    this.router.navigate(['masters/users/create']);
  }
  editUser(id) {
    this.router.navigate(['masters/users/edit/' + id]);
  }

  getUsers() {
    this.userService.list({}).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.userList = response.data;
        this.tempFilter = this.userList;
      }
    });
  }
  getRowHeight(row) {
    return row.height;
  }

  changeStatus(id, status, deleted) {
    let data = {
      status: deleted ? AppConstant.STATUS_DELETED : status == AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE,
      updateddt: new Date(),
      updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
    };
    this.userService.update(data, id).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (deleted) {
          this.getUsers();
          this.bootstrapAlertService.showSucccess('#' + id + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
        }
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }

  search(event?) {
    let val = '';
    if( event != null && event!= undefined){
      val = event.target.value.toLowerCase();
    }
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
