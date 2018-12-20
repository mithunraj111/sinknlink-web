import { Component, OnInit, Output } from '@angular/core';
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
  @Output() locationdtls :any ={};
  formTitle: string;
  formSubmit: string;

  constructor() {
    this.data=[
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 083', area:'Ashok Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' },
      { pincode:'600 078', area:'K.K.Nagar', state:'TamilNadu', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'26-Dec-2018 15:00' }
    ]
  }

  ngOnInit() {}
 
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  addLocation(){
    this.locationdtls={};
    this.formTitle = 'Add Location';
    this.formSubmit = 'Save';
    this.openMyModal('locationmodal');
  }
  editLocation(data){
    this.locationdtls= data;
    this.formTitle = 'Edit Location';
    this.formSubmit = 'Update';
    this.openMyModal('locationmodal');
  }
}
