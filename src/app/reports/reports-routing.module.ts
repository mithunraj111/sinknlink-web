import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaCategoriesComponent } from './area-categories/area-categories.component';
import { BusinessComponent } from './business/business.component';
import { PaymentComponent } from './payment/payment.component';
import { DealerComponent } from './dealer/dealer.component';
import { ConsumerComponent } from './consumer/consumer.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports',
      status: false
    },
    children: [
      {
        path: 'areacategories',
        component: AreaCategoriesComponent
      },
      {
        path: 'payments',
        component: PaymentComponent
      },
      {
        path: 'dealer',
        component: DealerComponent
      },
      {
        path: 'consumer',
        component: ConsumerComponent
      },
      {
        path: 'business',
        component: BusinessComponent
      }
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
