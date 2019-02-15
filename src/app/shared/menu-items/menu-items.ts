import { Injectable } from '@angular/core';
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
        state: 'areacategories',
        name: 'Area & Categories',
        code: 'r_areacategories'
      },
      {
        state: 'dealer',
        name: 'Dealer Report',
        code: 'r_dealer'
      },
      {
        state: 'customerdetail',
        name: 'Customer Detail Report',
        code: 'r_customer'
      },
      {
        state: 'consumer',
        name: 'Consumer Report',
        code: 'r_consumer'
      },
      {
        state: 'payments',
        name: 'Payment Report',
        code: 'r_payments'
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  menuItems = [] as any;
  constructor() {
  }
  formMenu(availScreens) {
    this.menuItems = [];
    const groupedMenus = _.groupBy(availScreens, 'prntscreencode');
    const self = this;
    const len = MENUITEMS.length;
    for (let i = 0; i < MENUITEMS.length; i++) {
      const item = MENUITEMS[i];
      if (_.has(groupedMenus, item.code)) {
        const data: any = _.get(groupedMenus, item.code);
        if (!_.isUndefined(data) && _.isUndefined(item.children)) {
          self.menuItems.push(item);
        } else if (!_.isUndefined(data) && !_.isUndefined(item.children)) {
          const app_child = item.children;
          const locChildren = [] as any;
          _.map(data, function (actual) {
            let hasdata = {} as any;
            hasdata = _.find(app_child, { code: actual.screencode });
            if (!_.isUndefined(actual.assignedpermissions)) {
              if (!_.isUndefined(hasdata) && actual.assignedpermissions.length > 0) {
                locChildren.push(hasdata);
              }
            }
          });
          if (locChildren.length > 0) {
            item.children = locChildren;
            self.menuItems.push(item);
          }
        }
      }
      if (len === (i + 1)) {
        return self.menuItems;
      }
    }
  }
}
