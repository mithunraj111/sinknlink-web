import { Injectable } from '@angular/core';
import { InjectorInstance } from './common.service';
import { LocalStorageService } from './local-storage.service';
import { AppConstant } from '../app.constants';
@Injectable()
export class BaseService {
    userstoragedata = {} as any;
    localStorageService: LocalStorageService;
    constructor() {
        this.localStorageService = new LocalStorageService();
        this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
    }
    // RBAC Implementation
    getScreenDetails(screencode: string) {
    }
}
