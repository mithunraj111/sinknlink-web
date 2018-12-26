import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-vip-number-registration',
  templateUrl: './vip-number-registration.component.html',
  styleUrls: ['./vip-number-registration.component.scss']
})
export class VipNumberRegistrationComponent implements OnInit {
  data: any[];

  constructor() { 
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
    ]
  }

  ngOnInit() {
  }

}
