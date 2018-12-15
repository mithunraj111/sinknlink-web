import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'masters',
        loadChildren: './masters/masters.module#MastersModule'
      },
      {
        path: 'admins',
        loadChildren: './admins/admins.module#AdminsModule'
      },
      {
        path: 'navigation',
        loadChildren: './navigation/navigation.module#NavigationModule'
      },
      {
        path: 'widget',
        loadChildren: './widget/widget.module#WidgetModule'
      },
      {
        path: 'basic',
        loadChildren: './ui-elements/basic/basic.module#BasicModule'
      },
      {
        path: 'advance',
        loadChildren: './ui-elements/advance/advance.module#AdvanceModule'
      },
      {
        path: 'animations',
        loadChildren: './ui-elements/animation/animation.module#AnimationModule'
      },
      {
        path: 'forms',
        loadChildren: './forms/forms.module#FormsModule'
      },
      {
        path: 'bootstrap-table',
        loadChildren: './table/bootstrap-table/bootstrap-table.module#BootstrapTableModule'
      },
      {
        path: 'data-table',
        loadChildren: './table/data-table/data-table.module#DataTableModule'
      },
      {
        path: 'maintenance/error',
        loadChildren: './maintenance/error/error.module#ErrorModule'
      },
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
      },
      {
        path: 'email',
        loadChildren: './email/email.module#EmailModule'
      },
      {
        path: 'task',
        loadChildren: './task/task.module#TaskModule'
      },
      {
        path: 'crm-contact',
        loadChildren: './crm-contact/crm-contact.module#CrmContactModule'
      },
      {
        path: 'invoice',
        loadChildren: './extension/invoice/invoice.module#InvoiceModule'
      },
      {
        path: 'file-upload-ui',
        loadChildren: './extension/file-upload-ui/file-upload-ui.module#FileUploadUiModule'
      },
      {
        path: 'calendar',
        loadChildren: './extension/event-calendar/event-calendar.module#EventCalendarModule'
      },
      {
        path: 'charts',
        loadChildren: './chart/chart.module#ChartModule'
      },
      {
        path: 'map',
        loadChildren: './map/map.module#MapModule'
      },
      {
        path: 'simple-page',
        loadChildren: './simple-page/simple-page.module#SimplePageModule'
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
      },
      {
        path: 'email/email-template',
        loadChildren: './email/email-template/email-template.module#EmailTemplateModule'
      },
      {
        path: 'maintenance/offline-ui',
        loadChildren: './maintenance/offline-ui/offline-ui.module#OfflineUiModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
