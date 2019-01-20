import { Injectable } from '@angular/core';
import { AppConstant } from '../app.constants';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  prefix: string = AppConstant.LOCALSTORAGE.STR_PREFIX;
  private userSessionAdded = new Subject<String>();
  constructor() { }
  addItem(key: string, item: any, notify = false) {
    const olddata = localStorage.getItem(this.prefix + key);
    if (olddata != null) {
      localStorage.removeItem(this.prefix + key);
    }
    localStorage.setItem(this.prefix + key, JSON.stringify(item));
    if (notify) {
      this.userSessionAdded.next(item);
    }
  }

  getItem(key: string) {
    const item = localStorage.getItem(this.prefix + key);
    try {
      return JSON.parse(item);
    } catch (error) {
      return item;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(this.prefix + key);
  }

  clearAllItem() {
    localStorage.clear();
  }

  getUserSessionData(): Observable<any> {
    return this.userSessionAdded.asObservable();
  }
}
