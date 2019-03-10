import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';
import { NgxPermissionsGuard } from 'ngx-permissions';


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
        canActivate: [NgxPermissionsGuard],
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
        canActivate: [NgxPermissionsGuard],
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
        canActivate: [NgxPermissionsGuard],
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
        canActivate: [NgxPermissionsGuard],
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
