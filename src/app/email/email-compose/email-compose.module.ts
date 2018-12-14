import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComposeComponent } from './email-compose.component';
import {EmailComposeRoutingModule} from './email-compose-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EmailComposeRoutingModule,
    SharedModule
  ],
  declarations: [EmailComposeComponent]
})
export class EmailComposeModule { }
