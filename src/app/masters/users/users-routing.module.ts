import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      title: 'System users',
      status: false,
      permissions: {
        only: ['System users'],
        redirectTo: '/accessdenied'
      }
    }
  },
  {
    path: 'create',
    component: AddEditUserComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      title: 'User',
      permissions: {
        only: ['UsersCreate'],
        redirectTo: '/accessdenied'
      }
    }
  },
  {
    path: 'edit/:id',
    component: AddEditUserComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      title: 'User',
      permissions: {
        only: ['UsersEdit'],
        redirectTo: '/accessdenied'
      }
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
