import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';
import { EventService } from '../../services/admin/event.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

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
  constructor(private router: Router, private bootstrapAlertService: BootstrapAlertService, private eventService: EventService, private localStorageService: LocalStorageService, ) {
  }

  ngOnInit() {
    this.getEvents();
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
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
  search(event) {
    const val = event.target.value.toLowerCase();
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
  updateEvent(pk, status, isDeleted?) {
    let data = {
      eventid: pk,
      status: isDeleted == true ? AppConstant.STATUS_DELETED : status == AppConstant.STATUS_ACTIVE ? AppConstant.STATUS_INACTIVE : AppConstant.STATUS_ACTIVE,
      updateddt: new Date(),
      updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
    }
    this.eventService.update(data, pk).subscribe(res => {
      let response = JSON.parse(res._body);
      if (response.status) { this.getEvents(); this.bootstrapAlertService.showSucccess(response.message); }
      else this.bootstrapAlertService.showError(response.message);
    }, err => {
      console.log(err);
    });
    console.log(data);
  }
}
