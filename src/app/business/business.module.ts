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
import { AccordionModule } from '../ui-elements/basic/accordion/accordion.module';
import { TagInputModule } from 'ngx-chips';
import { FileUploadModule } from 'ng2-file-upload';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';
import { CustomerPaymentsComponent } from './customer/add-edit-customer/customer-payments/customer-payments.component';
import { CustomerBranchesComponent } from './customer/add-edit-customer/customer-branches/customer-branches.component';
import { CustomerGigsComponent } from './customer/add-edit-customer/customer-gigs/customer-gigs.component';
import { CustomerCouponsComponent } from './customer/add-edit-customer/customer-coupons/customer-coupons.component';
import { CustomerBusinessDetailsComponent } from './customer/add-edit-customer/customer-business-details/customer-business-details.component';


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
   AccordionModule,
   TagInputModule,
   FileUploadModule
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
   CustomerBusinessDetailsComponent
 ]
})
export class BusinessModule { }