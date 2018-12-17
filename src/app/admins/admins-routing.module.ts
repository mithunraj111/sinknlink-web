import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { DonationsComponent } from './donations/donations.component';
import { AddEditEventsComponent } from './events/add-edit-events/add-edit-events.component';

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
        path: 'donations',
        component: DonationsComponent
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
