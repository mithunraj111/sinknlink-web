import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: '',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home',
      },
      {
        state: 'masters',
        short_label: 'M',
        name: 'Masters',
        type: 'sub',
        icon: 'ti-user',
        children: [
          {
            state: 'users',
            name: 'Users'
          },
          {
            state: 'roles',
            name: 'Roles'
          },
          {
            state: 'category',
            name: 'Categories'
          },
          {
            state: 'location',
            name: 'Location'
          }
        ]
      },
      {
        state: 'business',
        short_label: 'B',
        name: 'Business',
        type: 'sub',
        icon: 'ti-stats-up',
        children: [
          {
            state: 'customers',
            name: 'Customers'
          },
          {
            state: 'consumers',
            name: 'Consumers'
          },
          {
            state: 'dealer',
            name: 'Dealers'
          }
        ]
      },
      {
        state: 'admin',
        short_label: 'A',
        name: 'Admin',
        type: 'sub',
        icon: 'ti-user',
        children: [
          {
            state: 'events',
            name: 'Events'
          },
          {
            state: 'donations',
            name: 'Donations'
          },
          {
            state: 'vipnumberregistration',
            name: 'VIP Number Registration'
          },
          {
            state: 'lookup',
            name: 'Look up'
          }
        ]
      },
      {
        state: 'reports',
        short_label: 'R',
        name: 'Reports',
        type: 'sub',
        icon: 'ti-files',
        children: [
          {
            state: 'area-categories',
            name: 'Area & Categories'
          },
        ]
      }
    ],
  },
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
