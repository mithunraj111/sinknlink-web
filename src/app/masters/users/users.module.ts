import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UiSwitchModule } from 'ng2-ui-switch';
import { SelectModule } from 'ng-select';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UiSwitchModule,
    SelectModule
  ],
  declarations: [UsersComponent, AddEditUserComponent],
  bootstrap: []
})
export class UsersModule { }
