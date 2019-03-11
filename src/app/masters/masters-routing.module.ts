import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from '../services/auth.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'Masters',
      status: false
    },
    children: [
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: './users/users.module#UsersModule',
        data: {
          title: 'User',
          status: false,
          permissions: {
            only: ['Users'],
            redirectTo: '/'
          }
        }
      },
      {
        path: 'roles',
        canActivate: [AuthGuard],
        loadChildren: './roles/roles.module#RolesModule',
        data: {
          title: 'Role',
          status: false,
          permissions: {
            only: ['Roles'],
            redirectTo: '/'
          }
        }
      },
      {
        path: 'location',
        component: LocationComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Locations',
          status: false,
          permissions: {
            only: ['Location'],
            redirectTo: '/'
          }
        }
      },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Business Categories',
          status: false,
          permissions: {
            only: ['Categories'],
            redirectTo: '/'
          }
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
