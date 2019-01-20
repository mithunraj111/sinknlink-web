import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { DonationsComponent } from './donations/donations.component';
import { AddEditEventsComponent } from './events/add-edit-events/add-edit-events.component';
import { AddEditDonationsComponent } from './donations/add-edit-donations/add-edit-donations.component';
import { VipNumberRegistrationComponent } from './vip-number-registration/vip-number-registration.component';
import { AddEditVipRegistrationNumberComponent } from './vip-number-registration/add-edit-vip-registration-number/add-edit-vip-registration-number.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admins',
      status: false
    },
    children: [
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'event/create',
        component: AddEditEventsComponent
      },
      {
        path: 'event/edit/:id',
        component: AddEditEventsComponent
      },
      {
        path: 'donations',
        component: DonationsComponent
      },
      {
        path: 'donation/create',
        component: AddEditDonationsComponent,
      },
      {
        path: 'donation/edit/:id',
        component: AddEditDonationsComponent,
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
      }
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
