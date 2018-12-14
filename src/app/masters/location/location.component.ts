import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-fo-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {
  public data: any;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public userProPic: string;
  showDetails = false;
  showRegion = false;
  constructor(public http: Http) {
    this.data=[
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'02/12/2018' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'11/12/2018' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'02/12/2018' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'11/12/2018' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'02/12/2018' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'11/12/2018' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'02/12/2018' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'11/12/2018' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'02/12/2018' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'11/12/2018' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'02/12/2018' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'11/12/2018' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'02/12/2018' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'11/12/2018' }
    ]
  }

  ngOnInit() {}
 
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
