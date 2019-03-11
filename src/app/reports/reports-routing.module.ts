import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaCategoriesComponent } from './area-categories/area-categories.component';
import { PaymentComponent } from './payment/payment.component';
import { DealerComponent } from './dealer/dealer.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'areacategories',
        component: AreaCategoriesComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Area & Category Report',
          status: false,
          permissions: {
            only: ['Area & Categories'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'payments',
        component: PaymentComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Payment Report',
          status: false,
          permissions: {
            only: ['Payments'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'dealer',
        component: DealerComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Dealer Report',
          status: false,
          permissions: {
            only: ['Dealer Report'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'consumer',
        component: ConsumerComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Consumer Report',
          status: false,
          permissions: {
            only: ['Consumer Report'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'customerdetail',
        component: CustomerdetailComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Customer Detail Report',
          status: false,
          permissions: {
            only: ['Customer Detail Report'],
            redirectTo: '/accessdenied'
          }
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
