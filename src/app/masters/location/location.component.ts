import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { LocationService } from '../../services/masters/location.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AddEditLocationComponent } from './add-edit-location/add-edit-location.component';
import { AppMessages } from '../../app-messages';

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
  userstoragedata = {} as any;
  constructor(private locationService: LocationService,
    private localStorageService: LocalStorageService,
    private bootstrapAlertService: BootstrapAlertService) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.getLocations();
  }

  openLocationModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeLocationModal(event) {
    console.log(event);
    document.querySelector('#' + event).classList.remove('md-show');
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
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
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
    const data = {
      status: deleted ? AppConstant.STATUS_DELETED : status == AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE,
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname
    };
    this.locationService.update(data, id).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (deleted) {
          this.bootstrapAlertService.showSucccess('#' + id + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
        }
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  notifyLocationEntry(event) {
    if (!event.close) {
      this.getLocations();
      this.closeLocationModal('locationmodal');
    } else {
      this.closeLocationModal('locationmodal');
    }

  }
}
