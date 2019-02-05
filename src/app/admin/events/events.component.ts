import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { EventService } from '../../services/admin/event.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from 'src/app/app-messages';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  tempFilter = [];
  eventsList = [];
  displaydtimeformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  displaydateformat = AppConstant.API_CONFIG.ANG_DATE.displaydate;
  userstoragedata = {} as any;
  constructor(private router: Router,
    private bootstrapAlertService: BootstrapAlertService,
    private eventService: EventService,
    private localStorageService: LocalStorageService) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);

  }

  ngOnInit() {
    this.getEvents();
  }
  getEvents() {
    this.eventService.list({}).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
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
    let val = '';
    if (event != null && event != undefined)  {
      val = event.target.value.toLowerCase();
    }
    const temp = this.tempFilter.filter(item => {
      for (const key in item) {
        if (('' + item[key]).toLocaleLowerCase().includes(val)) {
          return ('' + item[key]).toLocaleLowerCase().includes(val);
        }
      }
    });
    this.eventsList = temp;
    this.table.offset = 0;
  }
  updateEvent(data,index,flag) {
    console.log(data.eventid);
    const updateObj = {
      updateddt: new Date(),
      updatedby: this.userstoragedata.fullname,
      status: flag == true ? AppConstant.STATUS_DELETED : 
        data.status == AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE
    }
    const formData = new FormData();
    formData.append('formData', JSON.stringify(updateObj));
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
