import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent} from './users.component'
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';
import { UiSwitchModule } from 'ng2-ui-switch';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UiSwitchModule
  ],
  declarations: [UsersComponent, AddEditUsersComponent],
  bootstrap:[UsersComponent]
})
export class UsersModule { }
