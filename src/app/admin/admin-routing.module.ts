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
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'events',
        component: EventsComponent,
        data: {
          title: 'Events',
          status: false
        },
      },
      {
        path: 'event/create',
        component: AddEditEventComponent,
        data: {
          title: 'Event',
          status: false
        },
      },
      {
        path: 'event/edit/:id',
        component: AddEditEventComponent,
        data: {
          title: 'Event',
          status: false
        },
      },
      {
        path: 'donations',
        component: DonationsComponent,
        data: {
          title: 'Donations',
          status: false
        },
      },
      {
        path: 'donation/create',
        component: AddEditDonationComponent,
        data: {
          title: 'Donation',
          status: false
        },
      },
      {
        path: 'donation/edit/:id',
        component: AddEditDonationComponent,
        data: {
          title: 'Donation',
          status: false
        },
      },
      {
        path: 'vipnumberregistration',
        component: VipNumberRegistrationComponent,
        data: {
          title: 'Vip number registration',
          status: false
        },
      },
      {
        path: 'vipnumberregistration/create',
        component: AddEditVipRegistrationNumberComponent,
        data: {
          title: 'Vip number registration',
          status: false
        },
      },
      {
        path: 'vipnumberregistration/edit/:id',
        component: AddEditVipRegistrationNumberComponent,
        data: {
          title: 'Vip number registration',
          status: false
        },
      },
      {
        path: 'lookup',
        component: LookupComponent,
        data: {
          title: 'Lookup',
          status: false
        },
      },
      {
        path: 'lookup/create',
        component: AddEditLookupComponent,
        data: {
          title: 'Lookup',
          status: false
        },
      },
      {
        path: 'lookup/edit/:id',
        component: AddEditLookupComponent,
        data: {
          title: 'Lookup',
          status: false
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
