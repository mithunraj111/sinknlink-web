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
    data: {
      title: 'Business',
      status: false
    },
    children: [
      {
        path: 'customers',
        component: CustomerComponent
      },
      {
        path: 'customers/create',
        component: AddEditCustomerComponent
      },
      {
        path: 'customers/edit/:id',
        component: AddEditCustomerComponent
      },
      {
        path: 'customers/branches',
        component: CustomerBranchesComponent
      },
      {
        path: 'customers/gigs',
        component: CustomerGigsComponent
      },
      {
        path: 'customers/coupons',
        component: CustomerCouponsComponent
      },
      {
        path: 'consumers',
        component: ConsumerComponent
      },
      {
        path: 'dealer',
        component: DealerComponent
      },
      {
        path: 'dealer/create',
        component: AddEditDealerComponent
      },
      {
        path: 'dealer/edit/:id',
        component: AddEditDealerComponent
      },
      {
        path: 'customers/payment_details',
        component: CustomerPaymentsComponent
      },
      {
        path: 'customers/gallery',
        component: CustomerGalleryComponent
      },
      {
        path: 'consumers/view/:id',
        component: ViewConsumerComponent
      },
      {
        path: 'branch',
        component: AddEditCustomerComponent
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
