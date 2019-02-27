import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Users',
      status: false
    }
  },
  {
    path: 'create',
    component: AddEditUserComponent,
    data:{
      title: 'User'
    }
  },
  {
    path: 'edit/:id',
    component: AddEditUserComponent,
    data:{
      title: 'User'
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
