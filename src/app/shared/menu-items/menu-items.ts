import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services';
import * as _ from 'lodash';
const MENUITEMS = [
  {
    state: 'dashboard',
    short_label: 'D',
    name: 'Dashboard',
    type: 'link',
    icon: 'ti-home',
    code: 'dashboard'
  },
  {
    state: 'masters',
    short_label: 'M',
    name: 'Masters',
    type: 'sub',
    icon: 'ti-user',
    code: 'masters',
    children: [
      {
        state: 'users',
        name: 'Users',
        code: 'm_users',
      },
      {
        state: 'roles',
        name: 'Roles',
        code: 'm_roles',
      },
      {
        state: 'category',
        name: 'Categories',
        code: 'm_categories',
      },
      {
        state: 'location',
        name: 'Location',
        code: 'm_location',
      }
    ]
  },
  {
    state: 'business',
    short_label: 'B',
    name: 'Business',
    type: 'sub',
    icon: 'ti-stats-up',
    code: 'business',
    children: [
      {
        state: 'customers',
        name: 'Customers',
        code: 'b_customers',
      },
      {
        state: 'consumers',
        name: 'Consumers',
        code: 'b_consumers',
      },
      {
        state: 'dealer',
        name: 'Dealers',
        code: 'b_dealers',
      }
    ]
  },
  {
    state: 'admin',
    short_label: 'A',
    name: 'Admin',
    type: 'sub',
    icon: 'ti-user',
    code: 'admin',
    children: [
      {
        state: 'events',
        name: 'Events',
        code: 'a_events',
      },
      {
        state: 'donations',
        name: 'Donations',
        code: 'a_donations',
      },
      {
        state: 'vipnumberregistration',
        name: 'VIP Number Registration',
        code: 'a_vipno',
      },
      {
        state: 'lookup',
        name: 'Look up',
        code: 'a_lookup'
      }
    ]
  },
  {
    state: 'reports',
    short_label: 'R',
    name: 'Reports',
    type: 'sub',
    icon: 'ti-files',
    code: 'reports',
    children: [
      {
        state: 'area-categories',
        name: 'Area & Categories',
        code: 'r_'
      },
    ]
  }
];

@Injectable()
export class MenuItems extends BaseService {
  menuItems = [] as any;
  constructor() {
    super();
    this.formMenu();
  }
  formMenu() {
    this.menuItems = [];
    const groupedMenus = _.groupBy(this.appscreens, 'prntscreencode');
    this.menuItems = [];
    const self = this;
    const len = MENUITEMS.length;
    if (this.appscreens != undefined && this.appscreens.length != 0) {
      _.map(MENUITEMS, function (item: any, idx: number) {
        if (_.has(groupedMenus, item.code)) {
          const data = _.get(groupedMenus, item.code);
          if (!_.isUndefined(data) && _.isUndefined(item.children)) {
            self.menuItems.push(item);
          } else if (!_.isUndefined(data) && !_.isUndefined(item.children)) {
            let app_child = item.children;
            item.children = [];
            _.map(data, function (actual) {
              let hasdata = {} as any;
              hasdata = _.find(app_child, { code: actual.screencode });
              if (actual.assignedpermissions != undefined) {
                if (hasdata != undefined && actual.assignedpermissions.length > 0) {
                  item.children.push(hasdata);
                }
              }
            });
            if (item.children.length > 0) {
              self.menuItems.push(item);
            }
          }
        }
        if (len === idx + 1) {
          // console.log(self.menuItems);
        }
      });
    }
  }
  getAll() {
    return this.menuItems;
  }
}
