import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public data: any;
  constructor(private router: Router) {
    this.data = [
      { businessname: 'Pavi', memberid: '001', location: 'Chennai', payment: '10000', enrolldate: '02-dec-2018' },
      { businessname: 'Pavithra', memberid: '002', location: 'Coimbatore', payment: '5000', enrolldate: '02-dec-2018' },
      { businessname: 'Pavithra', memberid: '003', location: 'Madurai', payment: '8000', enrolldate: '02-dec-2018' },
      { businessname: 'Pavithra', memberid: '004', location: 'velore', payment: '7600', enrolldate: '02-dec-2018' },
      { businessname: 'Pavithra', memberid: '005', location: 'Tanjore', payment: '9800', enrolldate: '02-dec-2018' },
      { businessname: 'Pavithra', memberid: '001', location: 'Chennai', payment: '10000', enrolldate: '02-dec-2018' },
     
    ];
  }

  ngOnInit() {
  }

}
