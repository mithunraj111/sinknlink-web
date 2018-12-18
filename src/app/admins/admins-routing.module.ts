import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { DonationsComponent } from './donations/donations.component';
import { AddEditEventsComponent } from './events/add-edit-events/add-edit-events.component';
import { AddEditDonationsComponent } from './donations/add-edit-donations/add-edit-donations.component';

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
    ],
  },
  {
    path: '',
    component: DonationsComponent,
    data: {
      title: 'Donations',
      icon: 'ti-settings',
      caption: 'donations',
      status: false
    }
  },
  {
    path: 'donations/create',
    component: AddEditDonationsComponent,
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
