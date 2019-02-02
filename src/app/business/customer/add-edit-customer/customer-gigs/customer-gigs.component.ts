import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, Output } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../../../app.constants';
import { GigsService } from 'src/app/services/business/gigs.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';

@Component({
  selector: 'app-customer-gigs',
  templateUrl: './customer-gigs.component.html',
  styleUrls: ['./customer-gigs.component.scss']
})
export class CustomerGigsComponent implements OnInit, OnChanges {
  gigsList = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  datedisplayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  userstoragedata = {} as any;
  @Input() customerid: number;
  @Output() gigObj = {} as any;
  constructor(private gigService: GigsService,
    private localStorageService: LocalStorageService,
    private bootstrapAlertService: BootstrapAlertService) {
  }
  ngOnInit() {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getgigsList(changes.customerid.currentValue);
  }
  getgigsList(customerid) {
    if (customerid) {
      this.gigService.list({ membershipid: customerid }).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.gigsList = response.data;
          this.tempFilter = this.gigsList;
        }
      });
    }
  }
  search(event?) {
    let val = '';
    if( event != null && event != undefined){
      val = event.target.value.toLowerCase();
    }
    const temp = this.tempFilter.filter(item => {
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.gigsList = temp;
    this.table.offset = 0;
  }
  updategigStatus(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    this.gigService.update(updateObj, data.gigid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (flag) {
          this.bootstrapAlertService.showSucccess('#' + data.gigid + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
          this.gigsList.splice(index, 1);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
          this.gigsList[index] = response.data;
        }
        this.gigsList = [...this.gigsList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  addGig() {
    this.openGigModal();
  }
  editGig(data) {
    this.gigObj = data;
    this.openGigModal();
  }
  notifyGigChange(event) {
    if (event.close) {
      this.closeGigModal();
    }
  }

  openGigModal() {
    document.querySelector('#gigmodal').classList.add('md-show');
  }
  closeGigModal() {
    document.querySelector('#gigmodal').classList.remove('md-show');
  }
}
