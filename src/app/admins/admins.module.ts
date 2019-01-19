import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { EventsComponent } from './events/events.component';
import { DonationsComponent } from './donations/donations.component';
import { SharedModule } from '../shared/shared.module';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ng2-ui-switch';
import { TagInputModule } from 'ngx-chips';
import { AddEditDonationsComponent } from './donations/add-edit-donations/add-edit-donations.component';
import { AddEditEventsComponent } from './events/add-edit-events/add-edit-events.component';
import { FileUploadModule } from 'ng2-file-upload';
import { VipNumberRegistrationComponent } from './vip-number-registration/vip-number-registration.component';
import { AddEditVipRegistrationNumberComponent } from './vip-number-registration/add-edit-vip-registration-number/add-edit-vip-registration-number.component';

@NgModule({
  imports: [
    CommonModule,
    AdminsRoutingModule,
    SharedModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    TagInputModule,
    FileUploadModule
  ],
  declarations: [EventsComponent,
    DonationsComponent,
    AddEditDonationsComponent,
    AddEditEventsComponent,
    VipNumberRegistrationComponent,
    AddEditVipRegistrationNumberComponent]
})
export class AdminsModule { }
