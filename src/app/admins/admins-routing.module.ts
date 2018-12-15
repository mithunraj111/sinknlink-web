import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { DonationsComponent } from './donations/donations.component';

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
