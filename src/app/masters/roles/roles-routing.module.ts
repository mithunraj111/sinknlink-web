import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      title: 'Roles',
      icon: 'ti-settings',
      caption: 'roles',
      status: false,
      permissions: {
        only: ['Roles'],
        redirectTo: '/'
      }
    }
  },
  {
    path: 'create',
    component: AddEditRoleComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      title: 'Role',
      icon: 'ti-settings',
      caption: 'add role',
      status: false,
      permissions: {
        only: ['Roles'],
        redirectTo: '/accessdenied'
      }
    }
  },
  {
    path: 'edit/:id',
    component: AddEditRoleComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      title: 'Role',
      icon: 'ti-settings',
      caption: 'edit role',
      status: false,
      permissions: {
        only: ['Roles'],
        redirectTo: '/accessdenied'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
