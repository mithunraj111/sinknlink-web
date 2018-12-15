import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  public data: any;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public userProPic: string;
  constructor() {
    this.data=[
      { charity:'AARP Foundation', startdate:'02-11-18', enddate:'01-12-18',  lastupdatedby:'Admin', lastupdateddt:'02/12/2018' },
      { charity:'AARP Foundation', startdate:'02-11-18', enddate:'01-12-18',  lastupdatedby:'Admin', lastupdateddt:'02/12/2018' }
  
]
   }

  ngOnInit() {
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
}
