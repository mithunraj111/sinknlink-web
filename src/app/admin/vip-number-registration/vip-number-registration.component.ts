import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FancyNumberService } from 'src/app/services/admin/fancynumber.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppConstant } from 'src/app/app.constants';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import * as Lodash from 'lodash';
import { CustomerService } from 'src/app/services/business';
import { fadeInOutTranslate } from '../../../assets/animations/fadeInOutTranslate';

@Component({
  selector: 'app-vip-number-registration',
  templateUrl: './vip-number-registration.component.html',
  styleUrls: ['./vip-number-registration.component.scss'],
  animations: [fadeInOutTranslate]

})
export class VipNumberRegistrationComponent implements OnInit {
  data: any[];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  tempFilter = [];
  rows = [];
  formTitle: string;
  blocklist: string;
  loadingIndicator = true;
  blockedList = [];
  condition: any = { fancynostatus: AppConstant.STATUS_AVAILABLE };

  selectedBiz;
  selectedFancyNos = [];
  blockRemarks: string;
  currentTab = 'Available';

  checks: any = {};

  parentBiz: any = [];
  emptymessages = AppConstant.EMPTY_MESSAGES.VIPNUMBER;
  messages = AppConstant.EMPTY_MESSAGES.VIPNUMBER;
  nodata = AppConstant.EMPTY_MESSAGES.VIPNUMBER;

  constructor(private customerService: CustomerService,
    private localStorageService: LocalStorageService,
    private fancynumberService: FancyNumberService,
    private router: Router, private bootstrapAlertService: BootstrapAlertService) {
    this.data = [
    ];
    this.tempFilter = this.data;
  }

  ngOnInit() {
    this.getAvailableList();
    this.loadingIndicator = true;
    this.fancynumberService.getParentBix({ status: 'Active' }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.parentBiz = Lodash.map(response.data, (item) => {
          return {
            label: item.bizname + ' - ' + item.membershipid,
            value: item.membershipid
          }
        })
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }

  tabChanged(prop) {
    this.currentTab = prop.nextId;
    this.condition = {
      fancynostatus: prop.nextId
    };
    if (prop.nextId == 'ALLOCATED') {
      this.getAllocatedBusiness();
    } else { this.getAvailableList(); }
  }

  getAllocatedBusiness() {
    this.loadingIndicator = true;
    this.customerService.list({
      status: AppConstant.STATUS_ACTIVE
    }, 'parentwithfancynos').subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.data = response.data;
        this.tempFilter = this.data;
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }

  getAvailableList() {
    if (this.currentTab === 'ALLOCATED') {
      this.getAllocatedBusiness();
    } else {
      this.loadingIndicator = true;
      const service = this.fancynumberService.getList(this.condition);
      service.subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.loadingIndicator = false;
          if (this.currentTab === 'BLOCKED') {
            this.blockedList = response.data;
          } else {
            this.data = response.data;
          }
          this.tempFilter = this.data;
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event?) {
    document.getElementsByClassName('md-show')[0].classList.remove('md-show');
  }

  blockVipNumber() {
    this.selectedBiz = '';
    this.formTitle = 'Block';
    if (this.selectedFancyNos.length > 0) {
      this.openMyModal('vipnoregmodal');
    } else {
      this.bootstrapAlertService.showError('Select atleast one VIP Number')
    }
  }

  allocateVipNumber() {
    this.selectedBiz = '';
    this.formTitle = 'Allocate';
    if (this.selectedFancyNos.length > 0) this.openMyModal('vipnoregmodal');
    else this.bootstrapAlertService.showError('Select atleast one VIP Number');
  }

  blockorallocateNumber() {
    let mode = this.formTitle;
    let selectedBiz = this.selectedBiz;
    let selectedFancyNos = Array.isArray(this.selectedFancyNos) == true ? this.selectedFancyNos : [this.selectedFancyNos];
    let data = { data: [] };
    if (mode == 'Block') {
      if (typeof selectedBiz == 'string') {
        let arr = Lodash.map(selectedFancyNos, (item) => {
          return {
            fancyid: item.id,
            fancynostatus: AppConstant.STATUS_BLOCKED,
            updateddt: new Date(),
            remarks: this.blockRemarks,
            updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
          }
        });
        data.data = arr;
      } else {
        let arr = Lodash.map(selectedFancyNos, (item) => {
          return {
            fancyid: item.id,
            remarks: this.blockRemarks,
            fancynostatus: AppConstant.STATUS_BLOCKED,
            membershipid: selectedBiz,
            updateddt: new Date(),
            updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
          }
        });
        data.data = arr;
      }
      this.loadingIndicator = true;
      this.fancynumberService.blockNumbers(data).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.loadingIndicator = false;
          this.getAvailableList();
          this.closeMyModal();
          this.bootstrapAlertService.showSucccess(response.message);
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      })
    } else {
      if (typeof selectedBiz == 'string') {
        this.bootstrapAlertService.showError('Business is required. Select One');
      } else {
        this.fancynumberService.allocateNumbers({
          'fancynos': selectedFancyNos,
          'bizid': selectedBiz,
          'updatedby': this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
        }).subscribe(res => {
          const response = JSON.parse(res._body);
          if (response.status) {
            this.closeMyModal();
            this.getAvailableList();
            this.bootstrapAlertService.showSucccess(response.message);
          } else {
            this.bootstrapAlertService.showError(response.message);
          }
        })
      }
    }
    Array.isArray(this.selectedFancyNos) == true ? this.selectedFancyNos.splice(0, this.selectedFancyNos.length) : '';
    this.selectedBiz = '';
    this.blockRemarks = '';
    this.checks = {};
  }

  unblockNumber(id) {

    let data = {
      data: [{
        fancyid: id,
        fancynostatus: AppConstant.STATUS_AVAILABLE,
        updateddt: new Date(),
        remarks: 'Unblocked by user',
        updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
      }]
    }
    this.loadingIndicator = true;
    this.fancynumberService.blockNumbers(data).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.getAvailableList();
        this.bootstrapAlertService.showSucccess(response.message);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    })
  }

  allocateNumber(fno, fid, bizid) {
    this.fancynumberService.allocateNumbers({
      'fancynos': [{ no: fno, id: fid }],
      'bizid': bizid,
      'updatedby': this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
    }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.getAvailableList();
        this.bootstrapAlertService.showSucccess(response.message);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    })
  }

  addVipRegistration() {
    this.router.navigate(['admin/vipnumberregistration/create']);
  }

  changeStatus(data, index, flag) {
    const updateObj = {
      status: flag ? AppConstant.STATUS_DELETED :
        (data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE),
      updateddt: new Date(),
      updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
    };
    if (flag) {
      this.fancynumberService.delete(updateObj, data.fancyid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess('#' + data.fancyid + ' ' + response.message);
          this.data.splice(index, 1);
          this.data = [...this.data];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    } else {
      this.fancynumberService.editNumber(updateObj, data.fancyid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.data[index].status = response.data.status;
          this.data = [...this.data];
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }

  }

  onNumberSelect(id, no) {
    const found: any = this.selectedFancyNos.find((o) => {
      return id === o.id;
    });
    if (found === undefined) {
      this.selectedFancyNos.push({ id: id, no: no });
    } else {
      this.selectedFancyNos.splice(this.selectedFancyNos.indexOf({ id: id, no: no }), 1);
    }
  }

  goToEdit(id) {
    this.router.navigate(['admin/vipnumberregistration/edit/' + id]);
  }

  search(event?) {
    let val = '';
    if (event != null && event != undefined) {
      val = event.target.value.toLowerCase();
    }
    const temp = this.tempFilter.filter(item => {
      for (let key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.data = temp;
    this.table.offset = 0;
  }

}
