import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToggleFullScreenDirective } from './fullscreen/toggle-fullscreen.directive';
import { HttpClientModule } from '@angular/common/http';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TitleComponent } from '../layout/main/title/title.component';
import { CardComponent } from './card/card.component';
import { CardToggleDirective } from './card/card-toggle.directive';
import { ModalAnimationComponent } from './modal-animation/modal-animation.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AccordionAnchorDirective } from './accordion/accordionanchor.directive';
import { AccordionLinkDirective } from './accordion/accordionlink.directive';
import { AccordionDirective } from './accordion/accordion.directive';
import { CategoryService } from '../services/masters/category.service';
import { LoginService } from '../services/auth/login.service';
import { ForgotPasswordService } from '../services/auth/forgotpassword.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BusinessService, MasterService, AdminService, AppCommonService } from '../services';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    ReactiveFormsModule
  ],
  exports: [
    NgbModule,
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    HttpClientModule,
    PerfectScrollbarModule,
    TitleComponent,
    CardComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    ClickOutsideModule,
    NgxDatatableModule
  ],
  declarations: [
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    TitleComponent,
    CardComponent,
    ModalAnimationComponent,
    SpinnerComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }, NgbActiveModal,
    LoginService,
    ForgotPasswordService,
    AdminService.DonationService,
    AdminService.EventService,
    AdminService.FancyNumberService,
    AdminService.LookupService,
    BusinessService.CouponService,
    BusinessService.CustomerService,
    BusinessService.DealerService,
    BusinessService.GigsService,
    BusinessService.ConsumerService,
    AppCommonService.DocumentService,
    AppCommonService.PaymentsService,
    AppCommonService.ReportService,
    MasterService.CategoryService,
    MasterService.LocationService,
    MasterService.RoleService,
    MasterService.UserService,
    MasterService.SettingService
  ]
})
export class SharedModule { }
