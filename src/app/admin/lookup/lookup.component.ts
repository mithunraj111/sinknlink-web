import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { LookupService } from '../../services/admin/lookup.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AppMessages } from '../../app-messages';
import * as _ from 'lodash';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Output()
  lookupObj = {} as any;
  userstoragedata = {} as any;
  lookupList = [];
  tempFilter = [];
  constructor(private lookupService: LookupService,
    private router: Router,
    private bootstrapAlertService: BootstrapAlertService,
    private localstorageService: LocalStorageService) {
    this.userstoragedata = this.localstorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.getLookup();
  }

  getLookup() {
    this.lookupService.list({}).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.lookupList = response.data;
        this.tempFilter = this.lookupList;
      }
    });
  }

  openLookupModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeLookupModal(event) {
    document.querySelector('#' + event).classList.remove('md-show');
  }
  getRowHeight(row) {
    return row.height;
  }
  addLookup() {
    this.lookupObj = {};
    this.openLookupModal('lookupmodal');
  }
  editLookup(data) {
    console.log(data)
    this.lookupObj = data;
    this.openLookupModal('lookupmodal');
  }
  notifyLookupEntry(event) {
    if (!event.close) {
      this.getLookup();
      this.closeLookupModal('lookupmodal');
    } else {
      this.closeLookupModal('lookupmodal');
    }
  }
  updateLookupStatus(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE)
    };
    this.lookupService.update(updateObj, data.refid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (flag) {
          this.bootstrapAlertService.showSucccess('#' + data.refid + ' ' + AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
          this.lookupList.splice(index, 1);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
          this.lookupList[index] = response.data;
        }
        this.lookupList = [...this.lookupList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
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
    this.lookupList = temp;
    this.table.offset = 0;
  }
}
