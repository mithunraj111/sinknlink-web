import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { DealerComponent } from './dealer/dealer.component';
import { Routes, RouterModule } from '@angular/router';
import { ConsumerComponent } from './consumer/consumer.component';

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
