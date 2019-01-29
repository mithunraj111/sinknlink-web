import { Component, OnInit, Input } from '@angular/core';
import { AppConstant } from '../../../app.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { fadeInOutTranslate } from '../../../../assets/animations/fadeInOutTranslate';
@Component({
  selector: 'app-add-edit-dealer',
  templateUrl: './add-edit-dealer.component.html',
  styleUrls: ['./add-edit-dealer.component.scss'],
  animations: [
    fadeInOutTranslate
  ]
})
export class AddEditDealerComponent implements OnInit {
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  dealerid: number;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private bootstrapAlertService: BootstrapAlertService) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.dealerid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
      }
    });
  }

  ngOnInit() {
  }
  submit() {
    this.bootstrapAlertService.showSucccess('Saved Successfully');
  }
}
