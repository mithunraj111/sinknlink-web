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
      title: 'Users',
      status: false,
      permissions: {
        only: ['Users'],
        redirectTo: '/'
      }
    }
  },
  {
    path: 'create',
    component: AddEditUserComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      title: 'User',
      permissions: {
        only: ['Users'],
        redirectTo: '/accessdenied'
      }
    }
  },
  {
    path: 'edit/:id',
    component: AddEditUserComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      title: 'User',
      permissions: {
        only: ['Users'],
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
