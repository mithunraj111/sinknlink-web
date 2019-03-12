import { Injectable } from '@angular/core';
import { InjectorInstance } from './common.service';
import { LocalStorageService } from './local-storage.service';
import { AppConstant } from '../app.constants';
import * as _ from 'lodash';
@Injectable()
export class BaseService {
    userstoragedata = {} as any;
    appscreens = [] as any;
    localStorageService: LocalStorageService;
    dealerdata = {} as any;
    add = false;
    view = false;
    edit = false;
    delete = false;
    download = false;
    constructor() {
        this.appscreens = [];
        this.localStorageService = new LocalStorageService();
        this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
        this.dealerdata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.DEALER);
        this.appscreens = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.SCREENS);
    }
    // RBAC Implementation
    getScreenDetails(screencode: string) {
        let current_screen = {} as any;
        current_screen = _.find(this.appscreens, { screencode: screencode });

        if (_.includes(current_screen.assignedpermissions, AppConstant.PERMISSION[0])) {
            this.add = true;
        }
        if (_.includes(current_screen.assignedpermissions, AppConstant.PERMISSION[1])) {
            this.view = true;
        }
        if (_.includes(current_screen.assignedpermissions, AppConstant.PERMISSION[2])) {
            this.edit = true;
        }
        if (_.includes(current_screen.assignedpermissions, AppConstant.PERMISSION[3])) {
            this.delete = true;
        }
        if (_.includes(current_screen.assignedpermissions, AppConstant.PERMISSION[4])) {
            this.download = true;
        }
    }
}
