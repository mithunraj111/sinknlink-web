import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppConstant } from '../../../../app.constants';
import { BusinessService, LocalStorageService, CommonService } from '../../../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../../../../app-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-customer-settings',
  templateUrl: './customer-settings.component.html'
})
export class CustomerSettingsComponent implements OnInit, OnChanges {

  constructor(private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
    private gigsService: BusinessService.GigsService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getSettingDetails(changes.customerObj.currentValue);
  }
  getSettingDetails(customerObj) {

  }

  updateSettings() {
  }
}
