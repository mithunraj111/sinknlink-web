import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from '../shared/shared.module';
import { UiSwitchModule } from 'ng2-ui-switch';
import { SelectModule } from 'ng-select';

import { ReportsRoutingModule } from './reports-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { DealerComponent } from './dealer/dealer.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';
import { AreaComponent } from './area/area.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { DonationComponent } from './donation/donation.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    DataTableModule,
    SharedModule,
    SelectModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CategoriesComponent, PaymentComponent, DealerComponent, ConsumerComponent, CustomerdetailComponent, AreaComponent, SubscriptionComponent, DonationComponent]
})
export class ReportsModule { }
