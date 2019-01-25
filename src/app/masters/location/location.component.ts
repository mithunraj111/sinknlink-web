import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { LocationService } from '../../services/masters/location.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AddEditLocationComponent } from './add-edit-location/add-edit-location.component';

@Component({
  selector: 'app-fo-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @Output() locationObj: any = {};
  @ViewChild(AddEditLocationComponent) locationModal: AddEditLocationComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  tempFilter = [];
  locationList = [];
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  constructor(private locationService: LocationService,
    private localStorageService: LocalStorageService,
    private bootstrapAlertService: BootstrapAlertService) {
  }

  ngOnInit() {
    this.getLocations();
  }

  openLocationModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  getRowHeight(row) {
    return row.height;
  }
  addLocation() {
    this.locationObj = {};
    this.openLocationModal('locationmodal');
  }
  editLocation(data) {
    this.locationObj = data;
    this.openLocationModal('locationmodal');
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
    this.locationList = temp;
    this.table.offset = 0;
  }

  // API call to get the location list
  getLocations() {
    this.locationService.list({}).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.locationList = response.data;
        this.tempFilter = this.locationList;
      }
    });
  }
  changeStatus(status, id, deleted) {
    let data = {
      locationid: id,
      status: deleted == true ? 'deleted' : status == 'Active' ? "InActive" : "Active",
      updateddt: new Date(),
      updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
    }
    this.locationService.update(data, id).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        // this.getLocations();
        if (deleted) {
          this.bootstrapAlertService.showSucccess("Location data deleted successfully");
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
        }
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    })
  }
}
