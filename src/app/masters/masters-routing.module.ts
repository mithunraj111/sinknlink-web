import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from '../services/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';


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
          status: false
        }
      },
      {
        path: 'roles',
        canActivate: [AuthGuard],
        loadChildren: './roles/roles.module#RolesModule',
        data: {
          title: 'Role',
          status: false
        }
      },
      {
        path: 'location',
        component: LocationComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Locations',
          status: false,
          permissions: {
            only: ['Location'],
            redirectTo: '/accessdenied'
          }
        }
      },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Business Categories',
          status: false,
          permissions: {
            only: ['Categories'],
            redirectTo: '/accessdenied'
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
