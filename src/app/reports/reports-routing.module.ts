import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaCategoriesComponent } from './area-categories/area-categories.component';
import { PaymentComponent } from './payment/payment.component';
import { DealerComponent } from './dealer/dealer.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'areacategories',
        component: AreaCategoriesComponent,
        data: {
          title: 'Area & Category Report',
          status: false
        },
      },
      {
        path: 'payments',
        component: PaymentComponent,
        data: {
          title: 'Payment Report',
          status: false
        },
      },
      {
        path: 'dealer',
        component: DealerComponent,
        data: {
          title: 'Dealer Report',
          status: false
        },
      },
      {
        path: 'consumer',
        component: ConsumerComponent,
        data: {
          title: 'Consumer Report',
          status: false
        },
      },
      {
        path: 'customerdetail',
        component: CustomerdetailComponent,
        data: {
          title: 'Customer Detail Report',
          status: false
        },
      }
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
