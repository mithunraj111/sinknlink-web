import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { PaymentComponent } from './payment/payment.component';
import { DealerComponent } from './dealer/dealer.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../services/auth.guard';
import { AreaComponent } from './area/area.component';
import { SubscriptionComponent } from './subscription/subscription.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'area',
        component: AreaComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Area Report',
          status: false,
          permissions: {
            only: ['Area Report'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Category Report',
          status: false,
          permissions: {
            only: ['Category Report'],
            redirectTo: '/accessdenied'
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
            redirectTo: '/accessdenied'
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
            redirectTo: '/accessdenied'
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
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'customerdetail',
        component: CustomerdetailComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Customer Report',
          status: false,
          permissions: {
            only: ['Customer Detail Report'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'subscription',
        component: SubscriptionComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Subscription Report',
          status: false,
          permissions: {
            only: ['Subscription Report'],
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
