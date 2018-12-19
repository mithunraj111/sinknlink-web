import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-donations',
  templateUrl: './add-edit-donations.component.html',
  styleUrls: ['./add-edit-donations.component.scss']
})
export class AddEditDonationsComponent implements OnInit {
  isaddForm= true;
  eventid: number;

  constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.eventid = params.id;
      }
    });
  }

  ngOnInit() {
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
