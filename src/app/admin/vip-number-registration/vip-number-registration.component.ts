import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FancyNumberService } from 'src/app/services/admin/fancynumber.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppConstant } from 'src/app/app.constants';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-vip-number-registration',
  templateUrl: './vip-number-registration.component.html',
  styleUrls: ['./vip-number-registration.component.scss']
})
export class VipNumberRegistrationComponent implements OnInit {
  data: any[];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  tempFilter = [];
  rows = [];
  formTitle: string;
  blocklist: string;

  condition: any = { fancynostatus: AppConstant.STATUS_AVAILABLE };

  selectedBiz;
  selectedFancyNos = [];
  blockRemarks: string;
  currentTab: string = "Available";

  parentBiz: any = [];

  constructor(private localStorageService: LocalStorageService, private fancynumberService: FancyNumberService, private router: Router, private bootstrapAlertService: BootstrapAlertService) {
    this.data = [
    ];
    this.tempFilter = this.data;
  }

  ngOnInit() {
    this.getAvailableList();
    this.fancynumberService.getParentBix({ status: "Active" }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.parentBiz = Lodash.map(response.data, (item) => {
          return {
            label: item.bizname + " - " + item.membershipid,
            value: item.membershipid
          }
        })
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  tabChanged(prop) {
    this.condition = {
      fancynostatus: prop.nextId
    }
    this.currentTab = prop.nextId
    this.getAvailableList();
  }
  getAvailableList() {
    this.fancynumberService.getList(this.condition).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.data = response.data;
        this.tempFilter = this.data;
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event?) {
    document.getElementsByClassName("md-show")[0].classList.remove('md-show');
  }
  blockVipNumber() {
    this.selectedBiz = "";
    this.formTitle = 'Block';
    if (this.selectedFancyNos.length > 0) this.openMyModal('vipnoregmodal');
    else this.bootstrapAlertService.showError("Select atleast one VIP Number");
  }
  allocateVipNumber() {
    this.selectedBiz = "";
    this.formTitle = 'Allocate';
    if (this.selectedFancyNos.length > 0) this.openMyModal('vipnoregmodal');
    else this.bootstrapAlertService.showError("Select atleast one VIP Number");
  }


  blockorallocateNumber() {
    let mode = this.formTitle;
    let selectedBiz = this.selectedBiz;
    let selectedFancyNos = Array.isArray(this.selectedFancyNos) == true ? this.selectedFancyNos : [this.selectedFancyNos];

    let data = {
      data: []
    };

    if (mode == 'Block') {
      if (typeof selectedBiz == "string") {
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
      this.fancynumberService.blockNumbers(data).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.getAvailableList();
          this.closeMyModal();
          this.bootstrapAlertService.showSucccess(response.message);
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      })
    } else {
      if (typeof selectedBiz == "string") {
        this.bootstrapAlertService.showError("Business is required. Select One");
      } else {
        this.fancynumberService.allocateNumbers({
          "fancynos": selectedFancyNos,
          "bizid": selectedBiz,
          "updatedby": this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
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

    // this.getAvailableList();

  }

  unblockNumber(id) {
    let data = {
      data: [{
        fancyid: id,
        fancynostatus: AppConstant.STATUS_AVAILABLE,
        updateddt: new Date(),
        remarks: "Unblocked by user",
        updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
      }]
    }
    this.fancynumberService.blockNumbers(data).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.getAvailableList();
        this.bootstrapAlertService.showSucccess(response.message);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    })
  }

  allocateNumber(fno, fid, bizid) {
    this.fancynumberService.allocateNumbers({
      "fancynos": [{ no: fno, id: fid }],
      "bizid": bizid,
      "updatedby": this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
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
  changeStatus(pk, status, deleted?) {
    let data = {
      fancyid: pk,
      status: deleted == true ? AppConstant.STATUS_DELETED : status == AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE,
      updateddt: new Date(),
      updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
    }
    this.fancynumberService.editNumber(data, pk).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.getAvailableList();
        this.bootstrapAlertService.showSucccess(response.message);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    })
  }
  onNumberSelect(id, no) {
    let found = this.selectedFancyNos.find((o) => { return id == o });
    if (found == undefined) this.selectedFancyNos.push({ id: id, no: no });
    else this.selectedFancyNos.splice(this.selectedFancyNos.indexOf({ id: id, no: no }), 1);
  }
  search(event?) {
    let val = '';
    if (event != null && event != undefined) {
      val = event.target.value.toLowerCase();
    }
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
