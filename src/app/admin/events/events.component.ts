import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { BaseService, AdminService, CommonService } from '../../services';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent extends BaseService implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  emptymessages = AppConstant.EMPTY_MESSAGES.EVENTS;

  tempFilter = [];
  eventsList = [];
  displaydtimeformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  displaydateformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  loadingIndicator: boolean = true;
  constructor(private router: Router,
    private bootstrapAlertService: BootstrapAlertService,
    private eventService: AdminService.EventService, private commonService: CommonService) {
    super();
    this.getScreenDetails('a_events');
  }

  ngOnInit() {
    this.getEvents();
  }
  getEvents() {
    this.loadingIndicator = true;
    this.eventService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.loadingIndicator = false;
        this.eventsList = response.data;
        this.tempFilter = this.eventsList;
      }
    });
  }
  addEvent() {
    this.router.navigate(['admin/event/create']);
  }
  editEvent(id) {
    this.router.navigate(['admin/event/edit/' + id]);
  }
  search(event?) {
    this.eventsList = this.commonService.globalSearch(this.tempFilter, event);
    this.table.offset = 0;
  }
  updateEvent(data, index, flag) {
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag ? AppConstant.STATUS_DELETED :
        data.status === AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(updateObj));
    this.eventService.update(formData, data.eventid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        if (flag) {
          this.bootstrapAlertService.showSucccess(AppMessages.VALIDATION.COMMON.DELETE_SUCCESS);
          this.eventsList.splice(index, 1);
        } else {
          this.bootstrapAlertService.showSucccess(response.message);
          this.eventsList[index].status = response.data.status;
        }
        this.eventsList = [...this.eventsList];
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    });
  }
}
