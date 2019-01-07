import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';


@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss']
})
export class DealerComponent implements OnInit {

  public data: any;
  tempFilter = [];
  buttontext: string;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  date_displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: Date;
  constructor(private router: Router) {
    this.data = [
      { dealername: 'Pavithra', mobileno: '9874563210', id: '89769', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'Pavithra', mobileno: '9876543210', id: '89769', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'Pavithra', mobileno: '9876543210', id: '89769', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'pavi', mobileno: '9517538426', id: '89765', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'pavi', mobileno: '9874563210', id: '89765', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'pavi', mobileno: '9876543210', id: '89765', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'pavi', mobileno: '9517538426', id: '89765', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'pavi', mobileno: '9874563210', id: '89765', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'Pavithra', mobileno: '9876543210', id: '89765', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'Pavithra', mobileno: '9874563210', id: '89765', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'Pavithra', mobileno: '9876543210', id: '89765', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'Pavithra', mobileno: '9876543210', id: '89765', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'Pavithra', mobileno: '9517538426', id: '89765', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'pavi', mobileno: '9517538426', id: '89765', city: 'Salem', updatedby: 'Admin' },
      { dealername: 'pavi', mobileno: '9517538426', id: '89765', city: 'Salem', updatedby: 'Admin' }
    ];
    this.tempFilter = this.data;
    this.date = new Date();

  }

  ngOnInit() {
  }

  addDealer() {
    this.router.navigate(['business/dealer/create']);
    this.buttontext = AppConstant.BUTTON_TXT.SAVE;
  }
  editDealers(data) {
    this.router.navigate(['business/dealer/edit/:id' + 1]);
    this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
  }
  search(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempFilter.filter(item => {
      for (let key in item) {
        if (("" + item[key]).toLocaleLowerCase().includes(val)) {
          return ("" + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.data = temp;
    this.table.offset = 0;
  }
}
