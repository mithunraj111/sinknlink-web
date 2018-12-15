import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-donations',
  templateUrl: './add-edit-donations.component.html',
  styleUrls: ['./add-edit-donations.component.scss']
})
export class AddEditDonationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
