import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/elements/dateParser';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../../app.constants';
import { AppMessages } from '../../app-messages';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class DealerComponent implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  dealerList = [
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', dealername: 'Sakthi Trades', totaldealers: '20',
    },
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', dealername: 'Sakthi Trades', totaldealers: '20',
    },
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', dealername: 'Sakthi Trades', totaldealers: '20',
    },
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', dealername: 'Sakthi Trades', totaldealers: '20',
    },
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', dealername: 'Sakthi Trades', totaldealers: '20',
    },
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', dealername: 'Sakthi Trades', totaldealers: '20',
    },
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', dealername: 'Sakthi Trades', totaldealers: '20',
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
