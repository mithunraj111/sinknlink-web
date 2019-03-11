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
import { from } from 'rxjs';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {
    path: '',
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
            redirectTo: '/'
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
            only: ['Events'],
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
            only: ['Events'],
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
            redirectTo: '/'
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
            only: ['Donations'],
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
            only: ['Donations'],
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
            redirectTo: '/'
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
            only: ['VIP Number Registration'],
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
            only: ['VIP Number Registration'],
            redirectTo: '/accessdenied'
          }
        },
      },
      {
        path: 'lookup',
        component: LookupComponent,
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Lookup',
          status: false,
          permissions: {
            only: ['Lookup'],
            redirectTo: '/'
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
            only: ['Lookup'],
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
            only: ['Lookup'],
            redirectTo: '/accessdenied'
          }
        },
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
