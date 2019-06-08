import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../../app.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { AppPlanService } from 'src/app/services/admin';
import { CommonService, LocalStorageService } from 'src/app/services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';

@Component({
  selector: 'app-add-edit-app-plan',
  templateUrl: './add-edit-app-plan.component.html',
  styleUrls: ['./add-edit-app-plan.component.scss']
})
export class AddEditAppPlanComponent implements OnInit {

  appPlanForm: FormGroup;
  planid: number;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  planErrObj = AppMessages.VALIDATION.PLAN;
  savingAppPlan = false;
  edit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appplanService: AppPlanService,
    private commonService: CommonService,
    private bootstrapAlertService: BootstrapAlertService,
    private localStorageService: LocalStorageService
  ) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        console.log('hi');
        this.planid = params.id;
        console.log(params.id);
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
        this.getAppPlanDetail(this.planid);
      }
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.appPlanForm = this.fb.group({
      planname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      planlevel: [null, Validators.compose([Validators.required])],
      cost: [null, Validators.compose([Validators.required])],
      taxpercent: [null, Validators.compose([Validators.required, Validators.max(100)])],
      noofdays: [null, Validators.compose([Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')])],
      trialperiod: [0, Validators.compose([Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')])],
      description: ['', Validators.maxLength(500)],
      status: [true],
    });
  }

  getAppPlanDetail(id) {
    this.appplanService.byId(id).subscribe(res => {
      let response = JSON.parse(res._body);
      let appPlanObj = response.data;
      this.edit = true;
      appPlanObj.status = response.data.status == AppConstant.STATUS_ACTIVE ? true : false;
      this.appPlanForm = this.fb.group({
        planname: [appPlanObj.planname, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
        planlevel: [appPlanObj.planlevel, Validators.compose([Validators.required])],
        cost: [appPlanObj.cost, Validators.compose([Validators.required])],
        taxpercent: [appPlanObj.taxpercent, Validators.compose([Validators.required, Validators.max(100)])],
        noofdays: [appPlanObj.noofdays, Validators.compose([Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')])],
        trialperiod: [appPlanObj.trialperiod, Validators.compose([Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')])],
        description: [appPlanObj.description, Validators.maxLength(500)],
        status: [appPlanObj.status]
      });
    }, err => {
      this.savingAppPlan = false;
      console.log(err);
    });
  }

  addAppPlan() {
    this.savingAppPlan = true;
    if (!this.appPlanForm.valid) {
      this.savingAppPlan = false;
      this.bootstrapAlertService.showError(this.commonService.getFormErrorMessage(this.appPlanForm, this.planErrObj));
      return false;
    }
    const data = this.appPlanForm.value;
    data.cost = Number(data.cost);
    data.taxpercent = Number(data.taxpercent);
    data.noofdays = Number(data.noofdays);
    data.trialperiod = Number(data.trialperiod);
    data.status = data.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
    if (this.edit) {
      data['updateddt'] = new Date();
      data['updatedby'] = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;
      this.updateEvent(data);
    } else {
      data.createddt = new Date();
      data.createdby = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;
      this.appplanService.create(data).subscribe(res => {
        this.savingAppPlan = false;
        let response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.router.navigate(['/admin/appplan/']);
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      }, err => {
        this.savingAppPlan = false;
        console.log(err);
      });
    }
  }
  updateEvent(data) {
    this.appplanService.update(data, this.planid).subscribe(res => {
      this.savingAppPlan = false;
      let response = JSON.parse(res._body);
      if (response.status) {
        this.bootstrapAlertService.showSucccess(response.message);
        this.router.navigate(['/admin/appplan/']);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
      this.savingAppPlan = false;
    });
  }

}
