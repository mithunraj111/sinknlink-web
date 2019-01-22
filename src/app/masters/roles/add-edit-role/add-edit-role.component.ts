import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { RoleService } from '../../../services/masters/role.service';
import { LookupService } from '../../../services/admin/lookup.service';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit {

  public data: any;
  roleid: number;
  isaddForm = true;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  screensList = [];
  constructor(
    private route: ActivatedRoute,
    private bootstrapAlertService: BootstrapAlertService,
    private roleService: RoleService,
    private lookupService: LookupService
  ) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.roleid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
      }
    });
  }

  ngOnInit() {
    this.getScreenNames();
  }

  getScreenNames() {
    this.lookupService.list({ refkey: 'app_screens', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.screensList = response.data;
      }
    });
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  getRowHeight(row) {
    return row.height;
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  submit() {
    this.bootstrapAlertService.showSucccess('Saved Successfully');
  }
}

