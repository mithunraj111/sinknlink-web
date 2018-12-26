import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-vip-number-registration',
  templateUrl: './vip-number-registration.component.html',
  styleUrls: ['./vip-number-registration.component.scss']
})
export class VipNumberRegistrationComponent implements OnInit {
  data: any[];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  tempFilter = [];

  constructor(private router: Router) {
    this.data = [
      { membershipid: 'a111', state: 'Available', price: '100' },
      { membershipid: 'b222', state: 'Available', price: '200' },
      { membershipid: 'c333', state: 'Blocked', price: '100' },
      { membershipid: 'd444', state: 'Blocked', price: '100' },
      { membershipid: 'e555', state: 'Blocked', price: '100' },
      { membershipid: 'f666', state: 'Available', price: '200' },
      { membershipid: 'g777', state: 'Blocked', price: '500' },
      { membershipid: 'h888', state: 'Available', price: '100' },
      { membershipid: 'i999', state: 'Available', price: '200' },
      { membershipid: 'j000', state: 'Available', price: '200' },
      { membershipid: 'a111', state: 'Available', price: '100' },
      { membershipid: 'b222', state: 'Available', price: '200' },
      { membershipid: 'c333', state: 'Blocked', price: '100' },
      { membershipid: 'd444', state: 'Blocked', price: '100' },
      { membershipid: 'e555', state: 'Blocked', price: '100' },
      { membershipid: 'f666', state: 'Available', price: '200' },
      { membershipid: 'g777', state: 'Blocked', price: '500' },
      { membershipid: 'h888', state: 'Available', price: '100' },
      { membershipid: 'i999', state: 'Available', price: '200' },
      { membershipid: 'j000', state: 'Available', price: '200' }
    ];
    this.tempFilter = this.data;
  }

  ngOnInit() { }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  allocateVipNumber() {
    this.openMyModal('vipnoregmodal');
  }
  addVipRegistration() {
    this.router.navigate(['admins/vipnumberregistration/create']);
  }
  editVipRegistration() {
    this.router.navigate(['admins/vipnumberregistration/edit' + 1]);
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
