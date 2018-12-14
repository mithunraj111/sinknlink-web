import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MastersRoutingModule } from './masters-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UiSwitchModule } from 'ng2-ui-switch';
import { LocationComponent } from './location/location.component';
import { AccordionModule } from '../ui-elements/basic/accordion/accordion.module';
import { CategoryComponent } from './category/category.component';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';

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
    AccordionModule
  ],
  declarations: [
    LocationComponent,
    CategoryComponent,
    AddEditCategoryComponent
  ],
})
export class MastersModule { }
