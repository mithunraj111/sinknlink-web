import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { AdminService, BaseService } from '../../services';
import { AppMessages } from '../../app-messages';
import * as _ from 'lodash';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html'
})
export class LookupComponent extends BaseService implements OnInit {
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  emptymessages = AppConstant.EMPTY_MESSAGES.LOOKUP;

  @Output() lookupObj = {} as any;
  lookupList = [];
  tempFilter = [];
  selectedKeyType: any = AppConstant.LOOKUP[0].value;
  keylist = AppConstant.LOOKUP;
  loadingIndicator: boolean = true;

  constructor(private lookupService: AdminService.LookupService,
    private bootstrapAlertService: BootstrapAlertService) {
    super();
    this.getScreenDetails('a_lookup');
  }

  ngOnInit() {
    this.getLookupList(AppConstant.LOOKUP[0]);
  }

  getLookupList(selected?) {
    this.lookupList = [];
    let condition = {} as any;
    if (selected !== undefined && selected.value !== undefined) {
      condition = {
        refkey: selected.value
      };
    } else if (selected !== undefined) {
      condition = {
        refkey: selected
      };
    }
    this.loadingIndicator = true;
    this.lookupService.list(condition).subscribe(res => {
      const response = JSON.parse(res._body);
      if (res.status) {
        this.loadingIndicator = false;
        this.lookupList = response.data;
        this.tempFilter = this.lookupList;
      }
    }, err => {
      console.log(err);
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
    this.lookupObj = data;
    this.openLookupModal('lookupmodal');
  }
  notifyLookupEntry(event) {
    if (!event.close) {
      this.getLookupList(this.selectedKeyType);
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
          this.lookupList[index].status = response.data.status;
        }
        this.lookupList = [...this.lookupList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
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
    this.lookupList = temp;
    this.table.offset = 0;
  }
}
