import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AppCommonService, CommonService } from '../../../../services';
import * as _ from 'lodash';
@Component({
  selector: 'app-customer-gallery',
  templateUrl: './customer-gallery.component.html',
  styleUrls: ['./customer-gallery.component.scss']
})
export class CustomerGalleryComponent implements OnInit, OnChanges {
  @Input() customerObj = {} as any;
  imagesList = [] as any;
  constructor(private documentService: AppCommonService.DocumentService,
    private commonService: CommonService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.getGalleries(changes.customerObj.currentValue);
  }
  getGalleries(customerObj) {
    if (!_.isEmpty(customerObj)) {
      this.documentService.list({ refid: customerObj.membershipid, reftype: 'Business' }).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.imagesList = response.data;
        }
      });
    }
  }
}
