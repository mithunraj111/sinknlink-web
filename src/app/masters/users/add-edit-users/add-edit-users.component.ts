import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent implements OnInit {

  @Input('modalDefault') modalDefault: any;
  isaddForm = true;
  userid: number;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  date_displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: any;
  constructor(private route: ActivatedRoute, private bootstrapAlertService: BootstrapAlertService) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.userid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
      }
    });
    this.date = new Date();
  }
  ngOnInit() {
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  submit() {
    // this.bootstrapAlertService.showError('Error Occured');
    // this.bootstrapAlertService.showInfo('This is an info!');    
    //  this.bootstrapAlertService.showWarning('This is a warning!');    
    this.bootstrapAlertService.showSucccess('Saved Successfully');
  }
}
