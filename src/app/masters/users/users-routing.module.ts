import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { UsersComponent} from './users.component';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Users',
      icon: 'ti-settings',
      caption: 'users',
      status: false
    }
  },
  {
    path: 'users/create',
    component: AddEditUsersComponent
  },
  {
    path: 'users/edit/:id',
    component: AddEditUsersComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
