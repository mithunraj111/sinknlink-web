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

  constructor(private router: Router) {
    this.data = [
      { dealername: 'Pavithra', mobileno: '9874563210', id: '89769', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'Pavithra', mobileno: '9876543210', id: '89769', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'Pavithra', mobileno: '9876543210', id: '89769', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'pavi', mobileno: '9517538426', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'pavi', mobileno: '9874563210', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'pavi', mobileno: '9876543210', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'pavi', mobileno: '9517538426', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'pavi', mobileno: '9874563210', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'Pavithra', mobileno: '9876543210', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'Pavithra', mobileno: '9874563210', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'Pavithra', mobileno: '9876543210', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'Pavithra', mobileno: '9876543210', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'Pavithra', mobileno: '9517538426', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'pavi', mobileno: '9517538426', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' },
      { dealername: 'pavi', mobileno: '9517538426', id: '89765', city: 'Salem', updatedby: 'Admin', updateddt: '02-Dec-2018 15:00' }
    ];
    this.tempFilter = this.data;
  }

  ngOnInit() {
  }

  addDealer() {
    this.router.navigate(['business/dealer/business-details']);
    this.buttontext = AppConstant.BUTTON_TXT.SAVE;
  }
  editDealers(data) {
    this.router.navigate(['business/dealer/business-details/edit/:id' + 1]);
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
