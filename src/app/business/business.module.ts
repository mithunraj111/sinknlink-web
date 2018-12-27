import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerComponent } from './dealer/dealer.component';
import { CustomerComponent } from './customer/customer.component';
import { BusinessRoutingModule } from './business-routing.module';
import { ConsumerComponent } from './consumer/consumer.component';

@NgModule({
  imports: [
    CommonModule,
    BusinessRoutingModule
  ],
  declarations: [
    CustomerComponent,
    DealerComponent,
    ConsumerComponent
  ]
})
export class BusinessModule { }
