import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { AuthComponent } from './layout/auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { AuthGuard } from './services/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AddEditCustomerComponent } from './business/customer/add-edit-customer/add-edit-customer.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Dashboard',
          permissions: {
            only: ['Dashboard'],
            redirectTo: '/accessdenied'
          }
        }
      },
      {
        path: 'mybusiness',
        component: AddEditCustomerComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'My Business'
        }
      },
      {
        path: 'masters',
        loadChildren: './masters/masters.module#MastersModule'
      },
      {
        path: 'business',
        loadChildren: './business/business.module#BusinessModule'
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'User Profile'
        }
      },
      {
        path: 'reports',
        loadChildren: './reports/reports.module#ReportsModule'
      },
      {
        path: 'accessdenied',
        component: AccessdeniedComponent
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
