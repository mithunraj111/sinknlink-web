import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { MastersComponent } from './masters/masters.component';
import { DataFilterPipe } from './shared/elements/data-filter.pipe';
import { AdminsComponent } from './admins/admins.component';
import { BootstrapAlertService, BootstrapAlertModule } from 'ngx-bootstrap-alert-service';
import { BusinessComponent } from './business/business.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
    MastersComponent,
    AdminsComponent,
    BusinessComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    BootstrapAlertModule
  ],
  providers: [MenuItems, DataFilterPipe, BootstrapAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
