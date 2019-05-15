import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppConstant } from '../../../../app.constants';
import { ConsumerService } from '../../../../services/business';
import { CommonService } from '../../../../services';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customer-followers',
  templateUrl: './customer-followers.component.html',
  styleUrls: ['./customer-followers.component.scss']
})
export class CustomerFollowersComponent implements OnInit {
  @Input() customerObj = {} as any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  noData: boolean;
  followerList: any;
  userfile;
  tempFilter = [];
  emptymessages = AppConstant.EMPTY_MESSAGES.FOLLOWERS;
  constructor(private consumerService: ConsumerService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getConsumerFavs();
  }
  getConsumerFavs() {
    this.consumerService.consumerFavs({ membershipid: this.customerObj.membershipid, status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      this.followerList = response.data;
      this.tempFilter = this.followerList;
      console.log(this.followerList);
    }, err => {
    })
  }
  search(event?) {
    this.followerList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
}
