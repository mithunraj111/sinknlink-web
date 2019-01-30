import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppConstant } from '../../../app.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { fadeInOutTranslate } from '../../../../assets/animations/fadeInOutTranslate';
import { DealerProfileComponent } from './profile/profile.component';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { DealerCustomersComponent } from './customers/customers.component';
import * as _ from 'lodash';
import { DealerService } from 'src/app/services/business/dealer.service';
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
  @Output() dealerObj = {} as any;
  @ViewChild(DealerProfileComponent) dealerProfile: DealerProfileComponent;
  @ViewChild(DealerCustomersComponent) dealerCustomers: DealerCustomersComponent;
  @ViewChild('deleartabs') deleartabs: NgbTabset;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.dealerid = params.id;
      }
    });
  }

  ngOnInit() {
  }
  saveOrUpdate() {
    if (this.deleartabs.activeId === '1') {
      this.dealerProfile.saveOrUpdateDealer();
    }
    if (this.deleartabs.activeId === '2') {

    }
    if (this.deleartabs.activeId === '3') {
    }
  }
  onTabChange(event) {
    if (event.nextId === '2' && !_.isUndefined(this.dealerid)) {
      this.dealerid = this.dealerid;
    }
  }
}
