import { Component, OnInit } from '@angular/core';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-add-edit-vip-registration-number',
  templateUrl: './add-edit-vip-registration-number.component.html',
  styleUrls: ['./add-edit-vip-registration-number.component.scss']
})
export class AddEditVipRegistrationNumberComponent implements OnInit {

  constructor(private bootstrapAlertService: BootstrapAlertService) { }

  ngOnInit() {
  }
  submit() {
    this.bootstrapAlertService.showError('Error Occured');
    // this.bootstrapAlertService.showInfo('This is an info!');    
    //  this.bootstrapAlertService.showWarning('This is a warning!');    
    // this.bootstrapAlertService.showSucccess('Saved Successfully');
  }
}
