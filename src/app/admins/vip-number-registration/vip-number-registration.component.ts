import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  selected = [];
  rows = [];
  formTitle: string;
  blocklist: string;
  constructor(private router: Router) {
    this.data = [
      { fancycode: 'a111', state: 'Available', price: '10000000' },
      { fancycode: 'b222', state: 'Available', price: '200' },
      { fancycode: 'c333', state: 'Blocked', price: '100' },
      { fancycode: 'd444', state: 'Blocked', price: '100' },
      { fancycode: 'd444', state: 'Blocked', price: '100' },
      { fancycode: 'e555', state: 'Blocked', price: '100' },
      { fancycode: 'f666', state: 'Available', price: '200' },
      { fancycode: 'g777', state: 'Blocked', price: '500' },
      { fancycode: 'h888', state: 'Available', price: '100' },
      { fancycode: 'i999', state: 'Available', price: '200' },
      { fancycode: 'j000', state: 'Available', price: '200' },
      { fancycode: 'a111', state: 'Available', price: '100' },
      { fancycode: 'b222', state: 'Available', price: '200' },
      { fancycode: 'c333', state: 'Blocked', price: '100' },
      { fancycode: 'd444', state: 'Blocked', price: '100' },
      { fancycode: 'e555', state: 'Blocked', price: '100' },
      { fancycode: 'f666', state: 'Available', price: '200' },
      { fancycode: 'g777', state: 'Blocked', price: '500' },
      { fancycode: 'h888', state: 'Available', price: '100' },
      { fancycode: 'i999', state: 'Available', price: '200' },
      { fancycode: 'j000', state: 'Available', price: '200' }
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
  blockVipNumber() {
    this.openMyModal('vipnoregmodal');
    this.formTitle = 'Block';

  }
  allocateVipNumber() {
    this.openMyModal('vipnoregmodal');
    this.formTitle = 'Allocate';
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
