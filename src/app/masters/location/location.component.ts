import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { MasterService,BaseService } from '../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AddEditLocationComponent } from './add-edit-location/add-edit-location.component';
import { AppMessages } from '../../app-messages';

@Component({
  selector: 'app-fo-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent extends BaseService implements OnInit {
  @Output() locationObj: any = {};
  @ViewChild(AddEditLocationComponent) locationModal: AddEditLocationComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  tempFilter = [];
  locationList = [];
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  constructor(private locationService: MasterService.LocationService,
    private bootstrapAlertService: BootstrapAlertService) {
    super();
  }

  ngOnInit() {
    this.getLocations();
    this.getScreenDetails('m_location');
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
  search(event?) {
    let val = '';
    if (event != null && event != undefined) {
      val = event.target.value.toLowerCase();
    }
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
  updateLocationStatus(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    this.locationService.update(updateObj, data.locationid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (flag) {
          this.bootstrapAlertService.showSucccess('#' + data.locationid + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
          this.locationList.splice(index, 1);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
          this.locationList[index].status = response.data.status;
        }
        this.locationList = [...this.locationList];
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
