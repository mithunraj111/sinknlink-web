import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/services/masters/user.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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

  constructor(private router: Router, private userService: UserService,
    private bootstrapAlertService: BootstrapAlertService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  addUsers() {
    this.router.navigate(['masters/users/create']);
    this.buttontext = AppConstant.BUTTON_TXT.SAVE;
  }
  editUsers(data) {
    this.router.navigate(['masters/users/edit/' + data.userid]);
    this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
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
      userid: id,
      status: deleted == true ? 'deleted' : status == 'Active' ? 'InActive' : 'Active',
      updateddt: new Date(),
      updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
    };
    this.userService.update(data, id).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (deleted) {
          this.getUsers();
          this.bootstrapAlertService.showSucccess('Deleted Successfully');
        }
        else {
          this.bootstrapAlertService.showSucccess(response.message);
        }
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    })
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
