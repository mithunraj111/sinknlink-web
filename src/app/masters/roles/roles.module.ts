import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RolesRoutingModule } from './roles-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HttpModule } from '@angular/http';
import { UiSwitchModule } from 'ng2-ui-switch';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddrolesComponent } from './addroles/addroles.component';
import { SelectModule } from 'ng-select';
import { SelectOptionService } from '../../shared/elements/select-option.service';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    SelectModule
  ],
  declarations: [RolesComponent, AddrolesComponent],
  bootstrap: [RolesComponent, AddrolesComponent],
  providers: [SelectOptionService]
})
export class RolesModule { }
