import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AppCommonService, CommonService, BaseService } from '../../../../services';
import * as _ from 'lodash';
import { AppMessages } from 'src/app/app-messages';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppConstant } from 'src/app/app.constants';
@Component({
  selector: 'app-customer-gallery',
  templateUrl: './customer-gallery.component.html'
})
export class CustomerGalleryComponent extends BaseService implements OnInit, OnChanges {
  @Input() customerObj = {} as any;
  imagesList = [] as any;
  displayImgList = [] as any;
  constructor(private documentService: AppCommonService.DocumentService,
    private bootstrapAlertService: BootstrapAlertService) {
    super();
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getGalleries(changes.customerObj.currentValue);
  }
  getGalleries(customerObj) {
    if (!_.isEmpty(customerObj)) {
      this.documentService.list({
        refid: customerObj.membershipid,
        reftype: 'Customer',
        status: AppConstant.STATUS_ACTIVE
      }).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.imagesList = response.data;
        }
      });
    }
  }

  imageAdded(files) {
    this.displayImgList = files;
  }

  saveOrUpdateGalleries() {
    if (_.isEmpty(this.customerObj)) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.BUSINESS.common);
      return false;
    } else {
      const formData = new FormData();
      for (let index = 0; index < this.displayImgList.length; index++) {
        const element = this.displayImgList[index];
        formData.append('files', element.image);
      }
      const reference = {
        refid: this.customerObj.membershipid,
        reftype: 'Customer',
        createddt: new Date(),
        createdby: this.userstoragedata.createdby
      };
      formData.append('data', JSON.stringify(reference));
      this.documentService.create(formData).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          // this.imagesList = response.data;
          this.bootstrapAlertService.showSucccess(response.message);
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      });
    }
  }
}
