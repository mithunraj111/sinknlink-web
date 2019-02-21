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

const routes: Routes = [
  {
    path: '',
    // data: {
    //   title: 'Business',
    //   status: false
    // },
    children: [
      {
        path: 'customers',
        component: CustomerComponent,
        data: {
          title: 'Customers',
          status: false
        },
      },
      {
        path: 'customers/create',
        component: AddEditCustomerComponent,
        data: {
          title: 'Customers',
          status: false
        },
      },
      {
        path: 'customers/edit/:id',
        component: AddEditCustomerComponent,
        data: {
          title: 'Customers',
          status: false
        },
      },
      {
        path: 'customers/branches',
        component: CustomerBranchesComponent,
        data: {
          title: 'Customers',
          status: false
        },
      },
      {
        path: 'customers/gigs',
        component: CustomerGigsComponent,
        data: {
          title: 'Customers',
          status: false
        },
      },
      {
        path: 'customers/coupons',
        component: CustomerCouponsComponent,
        data: {
          title: 'Customers',
          status: false
        },
      },
      {
        path: 'consumers',
        component: ConsumerComponent,
        data: {
          title: 'Consumers',
          status: false
        },
      },
      {
        path: 'dealer',
        component: DealerComponent,
        data: {
          title: 'Dealer',
          status: false
        },
      },
      {
        path: 'dealer/create',
        component: AddEditDealerComponent,
        data: {
          title: 'Dealer',
          status: false
        },
      },
      {
        path: 'dealer/edit/:id',
        component: AddEditDealerComponent,
        data: {
          title: 'Dealer',
          status: false
        },
      },
      {
        path: 'customers/payment_details',
        component: CustomerPaymentsComponent,
        data: {
          title: 'Customers',
          status: false
        },
      },
      {
        path: 'customers/gallery',
        component: CustomerGalleryComponent,
        data: {
          title: 'Customers',
          status: false
        },
      },
      {
        path: 'consumers/view/:id',
        component: ViewConsumerComponent,
        data: {
          title: 'Consumers',
          status: false
        },
      },
      {
        path: 'branch',
        component: AddEditCustomerComponent,
        data: {
          title: 'Customers',
          status: false
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
