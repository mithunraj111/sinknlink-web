import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FancyNumberService } from 'src/app/services/admin/fancynumber.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-vip-number-registration',
  templateUrl: './vip-number-registration.component.html',
  styleUrls: ['./vip-number-registration.component.scss']
})
export class VipNumberRegistrationComponent implements OnInit {
  data: any[];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  tempFilter = [];
  selected = [];
  rows = [];
  formTitle: string;
  blocklist: string;
  constructor(private fancynumberService: FancyNumberService,private router: Router,private bootstrapAlertService: BootstrapAlertService) {
    this.data = [
    ];
    this.tempFilter = this.data;
  }

  ngOnInit() {
    this.fancynumberService.getList({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.data = response.data;
        // console.log(response);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    })
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  blockVipNumber() {
    this.openMyModal('vipnoregmodal');
    this.formTitle = 'Block';

  }
  allocateVipNumber() {
    this.openMyModal('vipnoregmodal');
    this.formTitle = 'Allocate';
  }
  addVipRegistration() {
    this.router.navigate(['admin/vipnumberregistration/create']);
  }
  editVipRegistration() {
    this.router.navigate(['admin/vipnumberregistration/edit' + 1]);
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
