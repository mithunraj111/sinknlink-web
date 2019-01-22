import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot.component';
import { ForgotRoutingModule } from './forgot-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ForgotRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotComponent]
})
export class ForgotModule { }
