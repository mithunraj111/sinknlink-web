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
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
})
export class ConsumerComponent implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  consumerList = [
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', totalconsumers: '10',
    },
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', totalconsumers: '10',
    },
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', totalconsumers: '10',
    },
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', totalconsumers: '10',
    },
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', totalconsumers: '10',
    },
    {
      date: '06-Feb-2019', area: 'Saravanampatti', location: 'Coimbatore', totalconsumers: '10',
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
