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
    add = false;
    view = false;
    edit = false;
    delete = false;
    constructor() {
        this.appscreens = [];
        this.localStorageService = new LocalStorageService();
        this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
        this.appscreens = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.SCREENS);
    }
    // RBAC Implementation
    getScreenDetails(screencode: string) {
        let current_screen = {} as any;
        current_screen = _.find(this.appscreens, { screencode: screencode });

        if (_.includes(current_screen.permissions, 'Create')) {
            this.add = true;
        }
        if (_.includes(current_screen.permissions, 'View')) {
            this.view = true;
        }
        if (_.includes(current_screen.permissions, 'Edit')) {
            this.edit = true;
        }
        if (_.includes(current_screen.permissions, 'Delete')) {
            this.delete = true;
        }
    }
}
