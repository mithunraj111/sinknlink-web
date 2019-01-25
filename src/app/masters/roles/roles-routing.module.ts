import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    data: {
      title: 'Roles',
      icon: 'ti-settings',
      caption: 'roles',
      status: false
    }
  },
  {
    path: 'create',
    component: AddEditRoleComponent,
    data: {
      title: 'Add Role',
      icon: 'ti-settings',
      caption: 'add role',
      status: false
    }
  },
  {
    path: 'edit/:id',
    component: AddEditRoleComponent,
    data: {
      title: 'Edit Role',
      icon: 'ti-settings',
      caption: 'edit role',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
