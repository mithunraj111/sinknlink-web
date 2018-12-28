import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-branches',
  templateUrl: './customer-branches.component.html',
  styleUrls: ['./customer-branches.component.scss']
})
export class CustomerBranchesComponent implements OnInit {
  data: any[];

  constructor() { 
    this.data=[
      { name: 'Mithun', memberid: '001', location: 'Chennai', payment: '10000', duedate: '02/12/2018' },
      { name: 'Raj', memberid: '002', location: 'Coimbatore', payment: '5000', duedate: '20/12/2018' },
      { name: 'Mithunraj', memberid: '003', location: 'Madurai', payment: '8000', duedate: '26/12/2018' },
      { name: 'Myth', memberid: '004', location: 'velore', payment: '7600', duedate: '23/12/2018' },
      { name: 'Glaurang', memberid: '005', location: 'Tanjore', payment: '9800', duedate: '07/12/2018' }
    ];
  }

  ngOnInit() {
  }

}
