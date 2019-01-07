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
  isaddForm = true;
  userid: number;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
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

  submit() {
    this.bootstrapAlertService.showSucccess('Saved Successfully');
  }
}
