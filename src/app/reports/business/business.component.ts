import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  public configOpenTopBar: any = 'open';
  constructor() { }
  businessList = [
    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },
    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },
    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },
    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },
    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },
    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },    {
      bizname: "Sales", mobileno: "6410352356", regdate: "06-Feb-2019", membershiptype: 'paid', biztype: 'purchase',
      Category: 'test', paymenttenure: 'cash', gigscount: '10', couponcount: '25'
    },
  ];
  ngOnInit() {
  }
  toggleTopbar() {
    this.configOpenTopBar = this.configOpenTopBar === 'open' ? '' : 'open';
  }
}
