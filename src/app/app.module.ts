import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { BootstrapAlertService, BootstrapAlertModule } from 'ngx-bootstrap-alert-service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonService } from './services/common.service';
import { HttpHandlerService } from './services/http-handler.service';
import { LocalStorageService } from './services/local-storage.service';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    BootstrapAlertModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    MenuItems,
    BootstrapAlertService,
    HttpHandlerService,
    LocalStorageService,
    CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
