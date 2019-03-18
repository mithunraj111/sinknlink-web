import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { MasterService, BaseService, CommonService } from '../../services';
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
  emptymessages = AppConstant.EMPTY_MESSAGES.LOCATION;
  loadingIndicator = true;

  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  constructor(private locationService: MasterService.LocationService,
    private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService,
  ) {
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
    this.locationList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }

  // API call to get the location list
  getLocations() {
    this.loadingIndicator = true;
    this.locationService.list({}).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
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
    if (flag) {
      this.locationService.delete(updateObj, data.locationid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess('#' + data.locationid + ' ' + response.message);
          this.locationList.splice(index, 1);
          this.locationList = [...this.locationList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    } else {
      this.locationService.update(updateObj, data.locationid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.locationList[index].status = response.data.status;
          this.locationList = [...this.locationList];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }

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
