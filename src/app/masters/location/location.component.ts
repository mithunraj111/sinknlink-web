import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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
  @Output() locationdtls: any = {};
  @ViewChild(DatatableComponent) table: DatatableComponent;
  formTitle: string;
  formSubmit: string;
  locationPage: boolean;
  tempFilter = [];

  constructor() {
    this.data = [
      { pincode: '600 078', area: 'K.K.Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 083', area: 'Ashok Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 078', area: 'K.K.Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 083', area: 'Ashok Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 078', area: 'K.K.Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 083', area: 'Ashok Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 078', area: 'K.K.Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 083', area: 'Ashok Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 078', area: 'K.K.Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 083', area: 'Ashok Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 078', area: 'K.K.Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 083', area: 'Ashok Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' },
      { pincode: '600 078', area: 'K.K.Nagar', state: 'TamilNadu', city: 'Chennai', updatedby: 'Admin', updateddt: '26-Dec-2018 15:00' }
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
  addLocation() {
    this.locationdtls = {};
    this.formTitle = 'Add Locations';
    this.formSubmit = 'Save';
    this.openMyModal('locationmodal');
    this.locationPage = false;
  }
  editLocation(data) {
    this.locationdtls = data;
    this.formTitle = 'Edit Locations';
    this.formSubmit = 'Update';
    this.openMyModal('locationmodal');
    this.locationPage = true;
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
