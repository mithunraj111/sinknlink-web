import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaCategoriesComponent } from './area-categories/area-categories.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports',
      status: false
    },
    children: [
      {
        path: 'areacategories',
        component: AreaCategoriesComponent
      },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
