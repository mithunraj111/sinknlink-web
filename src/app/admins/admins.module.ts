import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { EventsComponent } from './events/events.component';

@NgModule({
  imports: [
    CommonModule,
    AdminsRoutingModule
  ],
  declarations: [EventsComponent]
})
export class AdminsModule { }
