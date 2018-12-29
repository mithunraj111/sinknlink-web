import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { DealerComponent } from './dealer/dealer.component';
import { Routes, RouterModule } from '@angular/router';
import { ConsumerComponent } from './consumer/consumer.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component'
import { CustomerBranchesComponent } from './customer/add-edit-customer/customer-branches/customer-branches.component';
import { CustomerGigsComponent } from './customer/add-edit-customer/customer-gigs/customer-gigs.component';
import { CustomerBusinessDetailsComponent } from './customer/add-edit-customer/customer-business-details/customer-business-details.component';
import { CustomerCouponsComponent } from './customer/add-edit-customer/customer-coupons/customer-coupons.component';
import { AddEditDealerComponent } from './dealer/add-edit-dealer/add-edit-dealer.component';
import { DealerBusinessDetailsComponent } from './dealer/add-edit-dealer/dealer-business-details/dealer-business-details.component';
import { CustomersComponent } from './dealer/add-edit-dealer/customers/customers.component';
import { DealerPaymentsComponent } from './dealer/add-edit-dealer/dealer-payments/dealer-payments.component';

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
        path: 'customers/business_details',
        component: CustomerBusinessDetailsComponent
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
        path: 'dealer/business-details',
        component: DealerBusinessDetailsComponent
      },
      {
        path: 'dealer/business-details/edit/:id',
        component: DealerBusinessDetailsComponent
      },
      {
        path: 'dealer/customers',
        component: CustomersComponent
      },
      {
        path: 'dealer/dealer-payments',
        component: DealerPaymentsComponent
      },
      {
        path: 'dealer/dealer-business-details',
        component: DealerBusinessDetailsComponent
      },
    ],
  },
]

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
