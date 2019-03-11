import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaCategoriesComponent } from './area-categories/area-categories.component';
import { PaymentComponent } from './payment/payment.component';
import { DealerComponent } from './dealer/dealer.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'areacategories',
        component: AreaCategoriesComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Area & Category Report',
          status: false,
          permissions: {
            only: ['Area & Categories'],
            redirectTo: '/'
          }
        },
      },
      {
        path: 'payments',
        component: PaymentComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Payment Report',
          status: false,
          permissions: {
            only: ['Payments'],
            redirectTo: '/'
          }
        },
      },
      {
        path: 'dealer',
        component: DealerComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Dealer Report',
          status: false,
          permissions: {
            only: ['Dealer Report'],
            redirectTo: '/'
          }
        },
      },
      {
        path: 'consumer',
        component: ConsumerComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Consumer Report',
          status: false,
          permissions: {
            only: ['Consumer Report'],
            redirectTo: '/'
          }
        },
      },
      {
        path: 'customerdetail',
        component: CustomerdetailComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Customer Detail Report',
          status: false,
          permissions: {
            only: ['Customer Detail Report'],
            redirectTo: '/'
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
