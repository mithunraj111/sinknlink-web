import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class MenuItems {
  menuItems = [] as any;
  constructor() {
  }
  formMenu(availScreens) {
    const menus = this.getMenus();
    this.menuItems = [];
    const groupedMenus = _.groupBy(availScreens, 'prntscreencode');
    const self = this;
    const len = menus.length;
    for (let i = 0; i < menus.length; i++) {
      const item = menus[i];
      if (_.has(groupedMenus, item.code)) {
        const data: any = _.get(groupedMenus, item.code);
        if (!_.isUndefined(data) && _.isUndefined(item.children)) {
          if (!_.isUndefined(data[0].assignedpermissions) && data[0].assignedpermissions.length > 0) {
            self.menuItems.push(item);
          }
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
  getMenus() {
    return [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'fa fa-home',
        code: 'dashboard',
        data: {
          title: 'Dashboard'
        }
      },
      {
        state: 'masters',
        short_label: 'M',
        name: 'Masters',
        type: 'sub',
        icon: 'fa fa-cogs',
        code: 'masters',
        children: [
          {
            state: 'users',
            name: 'System users',
            code: 'm_users',
            data: {
              title: 'Users'
            }
          },
          {
            state: 'roles',
            name: 'Roles',
            code: 'm_roles',
            data: {
              title: 'Roles'
            }
          },
          {
            state: 'category',
            name: 'Categories',
            code: 'm_categories',
            data: {
              title: 'Category'
            }
          },
          {
            state: 'location',
            name: 'Location',
            code: 'm_location',
            data: {
              title: 'Location'
            }
          }
        ]
      },
      {
        state: 'business',
        short_label: 'B',
        name: 'Business',
        type: 'sub',
        icon: 'fa fa-line-chart',
        code: 'business',
        children: [
          {
            state: 'customers',
            name: 'Customers',
            code: 'b_customers',
            data: {
              title: 'Customers'
            }
          },
          {
            state: 'consumers',
            name: 'Consumers',
            code: 'b_consumers',
            data: {
              title: 'Consumers'
            }
          },
          {
            state: 'dealer',
            name: 'Dealers',
            code: 'b_dealers',
            data: {
              title: 'Dealers'
            }
          }
        ]
      },
      {
        state: 'admin',
        short_label: 'A',
        name: 'Admin',
        type: 'sub',
        icon: 'fa fa-user',
        code: 'admin',
        children: [
          {
            state: 'events',
            name: 'Events',
            code: 'a_events',
            data: {
              title: 'Events'
            }
          },
          {
            state: 'donations',
            name: 'Donations',
            code: 'a_donations',
            data: {
              title: 'Donations'
            }
          },
          {
            state: 'vipnumberregistration',
            name: 'VIP Number Registration',
            code: 'a_vipno',
            data: {
              title: 'VIP Number Registration'
            }
          },
          {
            state: 'lookup',
            name: 'Look up',
            code: 'a_lookup',
            data: {
              title: 'Look up'
            }
          },
          {
            state: 'advertisement',
            name: 'Advertisement',
            code: 'a_advertisement',
            data: {
              title: 'Advertisement'
            }
          }
        ]
      },
      {
        state: 'reports',
        short_label: 'R',
        name: 'Reports',
        type: 'sub',
        icon: 'fa fa-file-text-o',
        code: 'reports',
        children: [
          {
            state: 'area',
            name: 'Area Wise Report',
            code: 'r_area',
            data: {
              title: 'Area'
            }
          },
          {
            state: 'categories',
            name: 'Category Wise Report',
            code: 'r_categories',
            data: {
              title: 'Categories'
            }
          },
          {
            state: 'dealer',
            name: 'Dealer Report',
            code: 'r_dealer',
            data: {
              title: 'Dealer Report'
            }
          },
          {
            state: 'customerdetail',
            name: 'Customer Detail Report',
            code: 'r_customer',
            data: {
              title: 'Customer Detail Report'
            }
          },
          {
            state: 'consumer',
            name: 'Consumer Report',
            code: 'r_consumer',
            data: {
              title: 'Consumer Report'
            }
          },
          {
            state: 'payments',
            name: 'Payment Report',
            code: 'r_payments',
            data: {
              title: 'Payment Report'
            }
          }
        ]
      }
    ];
  }
}
