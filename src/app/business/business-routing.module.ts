import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { DealerComponent } from './dealer/dealer.component';
import { Routes, RouterModule } from '@angular/router';
import { ConsumerComponent } from './consumer/consumer.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component'
import { CustomerBranchesComponent } from './customer/add-edit-customer/customer-branches/customer-branches.component';
import { CustomerGigsComponent } from './customer/add-edit-customer/customer-gigs/customer-gigs.component';
import { CustomerCouponsComponent } from './customer/add-edit-customer/customer-coupons/customer-coupons.component';
import { AddEditDealerComponent } from './dealer/add-edit-dealer/add-edit-dealer.component';
import { CustomerPaymentsComponent } from './customer/add-edit-customer/customer-payments/customer-payments.component';
import { CustomerGalleryComponent } from './customer/add-edit-customer/customer-gallery/customer-gallery.component';
import { ViewConsumerComponent } from './consumer/view-consumer/view-consumer.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'customers',
        component: CustomerComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Customers',
          status: false,
          permissions: {
            only: ['Customers'],
            redirectTo: '/'
          }
        },
      },
      {
        path: 'customers/create',
        component: AddEditCustomerComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Customer',
          status: false,
          permissions: {
            only: ['Customers'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'customers/edit/:id',
        component: AddEditCustomerComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Customer',
          status: false,
          permissions: {
            only: ['Customers'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'customers/branches',
        component: CustomerBranchesComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Customer',
          status: false,
          permissions: {
            only: ['Customers'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'customers/gigs',
        component: CustomerGigsComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Customer',
          status: false,
          permissions: {
            only: ['Customers'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'customers/coupons',
        component: CustomerCouponsComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Customer',
          status: false,
          permissions: {
            only: ['Customers'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'consumers',
        component: ConsumerComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Consumers',
          status: false,
          permissions: {
            only: ['Consumers'],
            redirectTo: '/'
          }
        },
      },
      {
        path: 'dealer',
        component: DealerComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Dealers',
          status: false,
          permissions: {
            only: ['Dealers'],
            redirectTo: '/'
          }
        },
      },
      {
        path: 'dealer/create',
        component: AddEditDealerComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Dealer',
          status: false,
          permissions: {
            only: ['Dealers'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'dealer/edit/:id',
        component: AddEditDealerComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Dealer',
          status: false,
          permissions: {
            only: ['Dealers'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'customers/payment_details',
        component: CustomerPaymentsComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Customers',
          status: false,
          permissions: {
            only: ['Customers'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'customers/gallery',
        component: CustomerGalleryComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Customers',
          status: false,
          permissions: {
            only: ['Customers'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'consumers/view/:id',
        component: ViewConsumerComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Consumer',
          status: false,
          permissions: {
            only: ['Consumers'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'branch',
        component: AddEditCustomerComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Customers',
          status: false,
          permissions: {
            only: ['Customers'],
            redirectTo: '/accessdenied'
          }
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class BusinessRoutingModule { }
