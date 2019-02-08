import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from '../shared/shared.module';
import { UiSwitchModule } from 'ng2-ui-switch';
import { SelectModule } from 'ng-select';

import { ReportsRoutingModule } from './reports-routing.module';
import { AreaCategoriesComponent } from './area-categories/area-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { DealerComponent } from './dealer/dealer.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';

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
  declarations: [AreaCategoriesComponent, PaymentComponent, DealerComponent, ConsumerComponent, CustomerdetailComponent]
})
export class ReportsModule { }