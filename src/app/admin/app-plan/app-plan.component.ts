import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService, CommonService } from '../../services';
import { AppConstant } from 'src/app/app.constants';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppPlanService } from 'src/app/services/admin/app-plan.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-plan',
  templateUrl: './app-plan.component.html',
  styleUrls: ['./app-plan.component.scss']
})
// export class AppPlanComponent implements OnInit {
  export class AppPlanComponent extends BaseService implements OnInit {

  constructor(
    private router: Router,
    private commonService: CommonService,
    private appPlanService: AppPlanService,
    private bootstrapAlertService: BootstrapAlertService,
    ) {
    super();
    this.getScreenDetails('a_appplan');
  }

  appplanList = [];
  @ViewChild(DatatableComponent) appplantable: DatatableComponent;
  loadingIndicator = true;
  tempFilter = [];
  emptymessages = AppConstant.EMPTY_MESSAGES.APPPLAN;
  displaydtimeformat= AppConstant.API_CONFIG.ANG_DATE.displaydtime;

  ngOnInit() {
    this.getAppPlan();
  }

  getAppPlan() {
    this.appPlanService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.appplanList = response.data;
        this.tempFilter = this.appplanList;
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }

  updateAppPlan(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    if (flag) {
      this.appPlanService.delete(updateObj, data.planid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess('#' + data.planid + ' ' + response.message);
          this.appplanList.splice(index, 1);
          this.appplanList = [...this.appplanList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    } else {
      this.appPlanService.update(updateObj, data.planid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.appplanList[index].status = response.data.status;
          this.appplanList = [...this.appplanList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }
  }

  addAppPlan() {
    this.router.navigate(['admin/appplan/create']);
  }

  editAppPlan(id) {
    this.router.navigate(['admin/appplan/edit/' + id]);
  }

  search(event ?) {
    this.appplanList = this.commonService.globalSearch(this.tempFilter, event);
    this.appplantable.offset = 0;
  }

}
