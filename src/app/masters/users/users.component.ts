import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MasterService, LocalStorageService, BaseService, CommonService } from '../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';
import { LoaderComponent } from '../../shared/loader/loader.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent extends BaseService implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  tempFilter = [];
  userList = [];
  noData: boolean = false;
  loadingIndicator: boolean = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  emptymessages = AppConstant.EMPTY_MESSAGES.USER;
  constructor(private router: Router, private userService: MasterService.UserService,
    private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
  ) {
    super();
    this.getScreenDetails('m_users');

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
    this.loadingIndicator = true;
    this.userService.list({ usertype: 'U' }).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.userList = response.data;
        this.tempFilter = this.userList;
      }
    });
  }
  getRowHeight(row) {
    return row.height;
  }

  changeStatus(data, index, flag) {
    const updateObj = {
      status: flag ? AppConstant.STATUS_DELETED :
        data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE,
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname
    };

    if (flag) {
      this.userService.delete(updateObj, data.userid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess('#' + data.userid + ' ' + response.message);
          this.userList.splice(index, 1);
          this.userList = [...this.userList];
        }
        else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }
    else {
      this.userService.update(updateObj, data.userid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.userList[index].status = response.data.status;
          this.userList = [...this.userList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }
  }
  search(event?) {
    this.userList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }


}
