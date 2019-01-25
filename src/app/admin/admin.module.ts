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
import { ImageUploaderComponent } from '../shared/image-uploader/image-uploader.component'
import { VipNumberRegistrationComponent } from './vip-number-registration/vip-number-registration.component';
import { AddEditVipRegistrationNumberComponent } from './vip-number-registration/add-edit-vip-registration-number/add-edit-vip-registration-number.component';

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
    FileUploadModule
  ],
  declarations: [EventsComponent,
    DonationsComponent,
    AddEditDonationComponent,
    AddEditEventComponent,
    ImageUploaderComponent,
    VipNumberRegistrationComponent,
    AddEditVipRegistrationNumberComponent]
})
export class AdminModule { }
