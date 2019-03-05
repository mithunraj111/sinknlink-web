import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerComponent } from './dealer/dealer.component';
import { CustomerComponent } from './customer/customer.component';
import { BusinessRoutingModule } from './business-routing.module';
import { ConsumerComponent } from './consumer/consumer.component';
import { SharedModule } from '../shared/shared.module';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ng2-ui-switch';
import { TagInputModule } from 'ngx-chips';
import { FileUploadModule } from 'ng2-file-upload';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';
import { CustomerPaymentsComponent } from './customer/add-edit-customer/customer-payments/customer-payments.component';
import { CustomerBranchesComponent } from './customer/add-edit-customer/customer-branches/customer-branches.component';
import { CustomerGigsComponent } from './customer/add-edit-customer/customer-gigs/customer-gigs.component';
import { AddEditDealerComponent } from './dealer/add-edit-dealer/add-edit-dealer.component';
import { DealerCustomersComponent } from './dealer/add-edit-dealer/customers/customers.component';
import { DealerPaymentsComponent } from './dealer/add-edit-dealer/payments/payments.component';
import { CustomerGalleryComponent } from './customer/add-edit-customer/customer-gallery/customer-gallery.component';
import { ViewConsumerComponent } from './consumer/view-consumer/view-consumer.component';
import { CustomerSettingsComponent } from './customer/add-edit-customer/customer-settings/customer-settings.component';
import { SelectModule } from 'ng-select';
import { CustomerCouponsComponent } from './customer/add-edit-customer/customer-coupons/customer-coupons.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { AddEditGigComponent } from './customer/add-edit-customer/customer-gigs/add-edit-gigs/add-edit-gigs.component';


@NgModule({
  imports: [
    CommonModule,
    BusinessRoutingModule,
    SharedModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    TagInputModule,
    FileUploadModule,
    SelectModule,
    BarRatingModule
  ],
  declarations: [
    CustomerComponent,
    DealerComponent,
    ConsumerComponent,
    AddEditCustomerComponent,
    CustomerPaymentsComponent,
    CustomerBranchesComponent,
    CustomerGigsComponent,
    CustomerCouponsComponent,
    AddEditDealerComponent,
    DealerCustomersComponent,
    DealerPaymentsComponent,
    ViewConsumerComponent,
    CustomerGalleryComponent,
    CustomerSettingsComponent,
    AddEditGigComponent
  ]
})
export class BusinessModule { }
