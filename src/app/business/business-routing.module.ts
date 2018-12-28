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
        path:'customers/business_details',
        component: CustomerBusinessDetailsComponent
      },
      {
        path:'customers/branches',
        component: CustomerBranchesComponent
      },
      {
        path:'customers/gigs',
        component: CustomerGigsComponent
      },
      {
        path:'customers/coupons',
        component: CustomerCouponsComponent
      },
      {
        path: 'consumers',
        component: ConsumerComponent
      },
      {
        path: 'dealers',
        component: DealerComponent
      }
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
