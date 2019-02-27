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
        loadChildren: './users/users.module#UsersModule',
        data: {
          title: 'User',
          status: false
        }
      },
      {
        path: 'roles',
        loadChildren: './roles/roles.module#RolesModule',
        data: {
          title: 'Role',
          status: false
        }
      },
      {
        path: 'location',
        component: LocationComponent,
        data: {
          title: 'Locations',
          status: false
        }
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'Business Categories',
          status: false
        }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
