import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { DonationsComponent } from './donations/donations.component';
import { AddEditEventsComponent } from './events/add-edit-events/add-edit-events.component';
import { AddEditDonationsComponent } from './donations/add-edit-donations/add-edit-donations.component';
import { VipNumberRegistrationComponent } from './vip-number-registration/vip-number-registration.component';

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
        path: 'events/create',
        component: AddEditEventsComponent
      },
      {
        path: 'events/edit/:id',
        component: AddEditEventsComponent      
      },
      {
        path: 'donations',
        component: DonationsComponent
      }, 
      {
        path: 'donations/create',
        component: AddEditDonationsComponent,
      },
      {
        path: 'donations/edit/:id',
        component: AddEditDonationsComponent,
      },
      {
        path: 'vipnumberregistration',
        component: VipNumberRegistrationComponent
      }
    ],
  },
  // {
  //   path: '',
  //   component: DonationsComponent,
  //   data: {
  //     title: 'Donations',
  //     icon: 'ti-settings',
  //     caption: 'donations',
  //     status: true
  //   }
  // },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
