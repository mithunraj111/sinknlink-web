import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConstant } from '../../app.constants';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public data: any;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public userProPic: string;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  showDetails = false;
  showRegion = false;
  tempFilter = [];
  date_displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  date: Date;
  constructor(private router: Router) {
    this.data = [
      { eventname: 'Moksha events', date: '16-Dec-2018', city: 'Chennai', updatedby: 'Admin' },
      { eventname: 'Hackathon on UAV', date: '16-Dec-2018', city: 'Chennai', updatedby: 'Admin' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018', city: 'Chennai', updatedby: 'Admin' },
      { eventname: 'ARM Workshop', date: '16-Dec-2018', city: 'Chennai', updatedby: 'Admin' },
      { eventname: 'Moksha events', date: '16-Dec-2018', city: 'Chennai', updatedby: 'Admin' },
      { eventname: 'Hackathon on UAV', date: '16-Dec-2018', city: 'Chennai', updatedby: 'Admin' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018', city: 'Chennai', updatedby: 'Admin' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018', city: 'Chennai', updatedby: 'Admin' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018', city: 'Chennai', updatedby: 'Admin' },
      { eventname: 'ARM Workshop', date: '16-Dec-2018', city: 'Chennai', updatedby: 'Admin' },
      { eventname: 'Mechovation 2k18-19', date: '16-Dec-2018', city: 'Chennai', updatedby: 'Admin' }
    ];
    this.tempFilter = this.data;
    this.date = new Date();

  }

  ngOnInit() { }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  addEvents() {
    this.router.navigate(['admins/events/create']);
  }
  editEvents(data) {
    this.router.navigate(['admins/events/edit/' + 1]);
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
