import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Masters',
      status: false
    },
    children: [
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      },
      {
        path: 'roles',
        loadChildren: './roles/roles.module#RolesModule'
      },
      {
        path: 'location',
        component: LocationComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
