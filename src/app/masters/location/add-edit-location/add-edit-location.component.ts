import { Component, OnInit, Input, } from '@angular/core';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.scss']
})
export class AddEditLocationComponent implements OnInit {
  @Input() title: string;
  @Input() submit: string;
  @Input() locationPage: boolean;
  constructor(private bootstrapAlertService: BootstrapAlertService) { }

  ngOnInit() {
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  save() {
    this.bootstrapAlertService.showSucccess('Saved Successfully');
  }

}
