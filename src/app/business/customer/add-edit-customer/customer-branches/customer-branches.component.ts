import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../../../../app.constants';

@Component({
  selector: 'app-customer-branches',
  templateUrl: './customer-branches.component.html',
  styleUrls: ['./customer-branches.component.scss']
})
export class CustomerBranchesComponent implements OnInit {
  data: any[];
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  date: any;
  constructor() { 
    this.data=[
      { name: 'Mithun', membershipid: '001', location: 'Chennai', payment: '10000', duedate: '02/12/2018' },
      { name: 'Raj', membershipid: '002', location: 'Coimbatore', payment: '5000', duedate: '20/12/2018' },
      { name: 'Mithunraj', membershipid: '003', location: 'Madurai', payment: '8000', duedate: '26/12/2018' },
      { name: 'Myth', membershipid: '004', location: 'velore', payment: '7600', duedate: '23/12/2018' },
      { name: 'Glaurang', membershipid: '005', location: 'Tanjore', payment: '9800', duedate: '07/12/2018' }
    ];
    this.date = new Date();

  }

  ngOnInit() {
  }

}
