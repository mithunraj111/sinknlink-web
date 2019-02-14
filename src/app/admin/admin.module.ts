import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { EventsComponent } from './events/events.component';
import { DonationsComponent } from './donations/donations.component';
import { SharedModule } from '../shared/shared.module';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ng2-ui-switch';
import { TagInputModule } from 'ngx-chips';
import { AddEditDonationComponent } from './donations/add-edit-donation/add-edit-donation.component';
import { AddEditEventComponent } from './events/add-edit-event/add-edit-event.component';
import { FileUploadModule } from 'ng2-file-upload';
import { VipNumberRegistrationComponent } from './vip-number-registration/vip-number-registration.component';
import { AddEditVipRegistrationNumberComponent } from './vip-number-registration/add-edit-vip-registration-number/add-edit-vip-registration-number.component';
import { LookupComponent } from './lookup/lookup.component';
import { SelectModule } from 'ng-select';
import { AddEditLookupComponent } from './lookup/add-edit-lookup/add-edit-lookup.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    TagInputModule,
    FileUploadModule,
    SelectModule
  ],
  declarations: [EventsComponent,
    DonationsComponent,
    AddEditDonationComponent,
    AddEditEventComponent,
    VipNumberRegistrationComponent,
    AddEditVipRegistrationNumberComponent,
    LookupComponent,
    AddEditLookupComponent]
})
export class AdminModule { }
