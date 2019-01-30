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
    data: {
      title: 'Admin',
      status: false
    },
    children: [
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'event/create',
        component: AddEditEventComponent
      },
      {
        path: 'event/edit/:id',
        component: AddEditEventComponent
      },
      {
        path: 'donations',
        component: DonationsComponent
      },
      {
        path: 'donation/create',
        component: AddEditDonationComponent,
      },
      {
        path: 'donation/edit/:id',
        component: AddEditDonationComponent,
      },
      {
        path: 'vipnumberregistration',
        component: VipNumberRegistrationComponent
      },
      {
        path: 'vipnumberregistration/create',
        component: AddEditVipRegistrationNumberComponent,
      },
      {
        path: 'vipnumberregistration/edit/:id',
        component: AddEditVipRegistrationNumberComponent,
      },
      {
        path: 'lookup',
        component: LookupComponent
      },
      {
        path: 'lookup/create',
        component: AddEditLookupComponent,
      },
      {
        path: 'lookup/edit/:id',
        component: AddEditLookupComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
