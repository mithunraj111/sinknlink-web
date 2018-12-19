import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { AddrolesComponent } from './addroles/addroles.component';

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
    component: AddrolesComponent,
    data: {
      title: 'Add Roles',
      icon: 'ti-settings',
      caption: 'add roles',
      status: false
    }
  },
  {
    path: 'edit/:id',
    component: AddrolesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
