import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from '../../../../app.constants';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public data: any;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  date: any;
  constructor(private router: Router) {
    this.data = [
      { businessname: 'Pavi', memberid: '001', location: 'Chennai', payment: '10000', },
      { businessname: 'Pavithra', memberid: '002', location: 'Coimbatore', payment: '5000' },
      { businessname: 'Pavithra', memberid: '003', location: 'Madurai', payment: '8000' },
      { businessname: 'Pavithra', memberid: '004', location: 'velore', payment: '7600' },
      { businessname: 'Pavithra', memberid: '005', location: 'Tanjore', payment: '9800' },
      { businessname: 'Pavithra', memberid: '001', location: 'Chennai', payment: '10000' },

    ];
    this.date = new Date();

  }

  ngOnInit() {
  }

}
