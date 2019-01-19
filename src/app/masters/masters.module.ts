import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MastersRoutingModule } from './masters-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UiSwitchModule } from 'ng2-ui-switch';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';
import { AddEditLocationComponent } from './location/add-edit-location/add-edit-location.component';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    MastersRoutingModule,
    SharedModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    TagInputModule
  ],
  declarations: [
    LocationComponent,
    CategoryComponent,
    AddEditCategoryComponent,
    AddEditLocationComponent
  ],
})
export class MastersModule { }
