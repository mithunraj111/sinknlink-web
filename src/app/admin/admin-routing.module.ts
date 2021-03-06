import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { DonationsComponent } from './donations/donations.component';
import { AddEditEventComponent } from './events/add-edit-event/add-edit-event.component';
import { AddEditDonationComponent } from './donations/add-edit-donation/add-edit-donation.component';
import { VipNumberRegistrationComponent } from './vip-number-registration/vip-number-registration.component';
import { AddEditVipRegistrationNumberComponent } from './vip-number-registration/add-edit-vip-registration-number/add-edit-vip-registration-number.component';
import { LookupComponent } from './lookup/lookup.component';
import { AddEditLookupComponent } from './lookup/add-edit-lookup/add-edit-lookup.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../services/auth.guard';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { AddEditAdvertisementComponent } from './advertisement/add-edit-advertisement/add-edit-advertisement.component';
import { AppPlanComponent } from './app-plan/app-plan.component'
import { AddEditAppPlanComponent } from './app-plan/add-edit-app-plan/add-edit-app-plan.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'events',
        component: EventsComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Events',
          status: false,
          permissions: {
            only: ['Events'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'event/create',
        component: AddEditEventComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Event',
          status: false,
          permissions: {
            only: ['EventsCreate'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'event/edit/:id',
        component: AddEditEventComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Event',
          status: false,
          permissions: {
            only: ['EventsEdit'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'donations',
        component: DonationsComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Donations',
          status: false,
          permissions: {
            only: ['Donations'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'donation/create',
        component: AddEditDonationComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Donation',
          status: false,
          permissions: {
            only: ['DonationsCreate'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'donation/edit/:id',
        component: AddEditDonationComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Donation',
          status: false,
          permissions: {
            only: ['DonationsEdit'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'vipnumberregistration',
        component: VipNumberRegistrationComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'VIP number registration',
          status: false,
          permissions: {
            only: ['VIP Number Registration'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'vipnumberregistration/create',
        component: AddEditVipRegistrationNumberComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'VIP number registration',
          status: false,
          permissions: {
            only: ['VIP Number RegistrationCreate'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'vipnumberregistration/edit/:id',
        component: AddEditVipRegistrationNumberComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'VIP number registration',
          status: false,
          permissions: {
            only: ['VIP Number RegistrationEdit'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'lookup',
        component: LookupComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Look up',
          status: false,
          permissions: {
            only: ['Lookup'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'lookup/create',
        component: AddEditLookupComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Lookup',
          status: false,
          permissions: {
            only: ['LookupCreate'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'lookup/edit/:id',
        component: AddEditLookupComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Lookup',
          status: false,
          permissions: {
            only: ['LookupCreate'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'advertisement',
        component: AdvertisementComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Advertisement',
          status: false,
          permissions: {
            only: ['Advertisement'],
            redirectTo: '/accessdenied'
          },
        },
      },
      {
        path: 'advertisement/create',
        component: AddEditAdvertisementComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Advertisement',
          status: false,
          permissions: {
            only: ['AdvertisementCreate'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'advertisement/edit/:id',
        component: AddEditAdvertisementComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Advertisement',
          status: false,
          permissions: {
            only: ['AdvertisementEdit'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'appplan',
        component: AppPlanComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'App Plan',
          status: false,
          permissions: {
            only: ['App Plan'],
            redirectTo: '/accessdenied'
          }
        }
      },
      {
        path: 'appplan/create',
        component: AddEditAppPlanComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Add Plan',
          status: false,
          permissions: {
            only: ['App PlanCreate'],
            redirectTo: '/accessdenied'
          }
        }
      },
      {
        path: 'appplan/edit/:id',
        component: AddEditAppPlanComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Edit Plan',
          status: false,
          permissions: {
            only: ['App PlanEdit'],
            redirectTo: '/accessdenied'
          }
        }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
