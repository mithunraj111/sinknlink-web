import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AppConstant } from '../../../../app.constants';
import { LocalStorageService, CommonService, MasterService } from '../../../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../../../../app-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
@Component({
    selector: 'app-customer-settings',
    templateUrl: './customer-settings.component.html'
})
export class CustomerSettingsComponent implements OnInit, OnChanges {
    settingForm: FormGroup;
    settingsList = [];
    @Input() customerObj = {} as any;
    constructor(private bootstrapAlertService: BootstrapAlertService,
        private commonService: CommonService,
        private settingService: MasterService.SettingService,
        private fb: FormBuilder) {
    }

    ngOnInit() {
        this.initSettingForm();
    }

    initSettingForm() {
        this.settingForm = this.fb.group({
            bizsearch: [true],
            chatyn: [true],
            coupongenyn: [true],
        });
    }
    ngOnChanges(changes: SimpleChanges) {
        this.getSettingDetails(changes.customerObj.currentValue);
    }
    getSettingDetails(customerObj) {
        if (customerObj.membershipid) {
            this.settingService.list({ membershipid: customerObj.membershipid }).subscribe(res => {
                const response = JSON.parse(res._body);
                if (response.status) {
                    if (response.data != null) {
                        this.settingsList = response.data;
                        console.log(this.settingsList);
                        const editForm = {} as any;
                        const self = this;
                        _.map(this.settingsList, function(item, idx) {
                            if (item.settingkey === 'chatyn') {
                                editForm.chatyn = item.settingvalue === 'Y' ? true : false;
                            }
                            if (item.settingkey === 'bizsearchyn') {
                                editForm.bizsearch = item.settingvalue === 'Y' ? true : false;
                            }
                            if (item.settingkey === 'autogencouponyn') {
                                editForm.coupongenyn = item.settingvalue === 'Y' ? true : false;
                            }
                            if ((idx + 1) === self.settingsList.length) {
                                self.settingForm.patchValue(editForm);
                            }
                        });
                    }
                }
            });
        }
    }

    updateSettings(customerObj) {
        if (_.isEmpty(customerObj) || _.isNull(customerObj) || _.isUndefined(customerObj)) {
            this.bootstrapAlertService.showError(AppMessages.VALIDATION.BUSINESS.common);
            return false;
        } else {
            for (let i = 0; i < this.settingsList.length; i++) {
                if (this.settingsList[i].settingkey === 'chatyn') {
                    this.settingsList[i].settingvalue = this.settingForm.value.chatyn ? 'Y' : 'N';
                }
                if (this.settingsList[i].settingkey === 'bizsearchyn') {
                    this.settingsList[i].settingvalue = this.settingForm.value.bizsearch ? 'Y' : 'N';
                }
                if (this.settingsList[i].settingkey === 'autogencouponyn') {
                    this.settingsList[i].settingvalue = this.settingForm.value.coupongenyn ? 'Y' : 'N';
                }
                if (i + 1 === this.settingsList.length) {
                    this.settingService.bulkupdate(this.settingsList).subscribe((res) => {
                        const response = JSON.parse(res._body);
                        if (response.status) {
                            this.bootstrapAlertService.showSucccess(response.message);
                        } else {
                            this.bootstrapAlertService.showError(response.message);
                        }
                    }, err => {
                        this.bootstrapAlertService.showError(err.message);
                    });
                }
            }
        }
    }
}
