import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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

  constructor(private router: Router) { 
    this.data=[
      { eventname: 'Moksha events', date: '16-Dec-2018', city:'Chennai', updatedby:'Admin', updateddt:'12-Nov-2018 11:00' },
      { eventname: 'Hackathon on UAV', date: '16-Dec-2018', city:'Chennai', updatedby:'Admin', updateddt:'12-Nov-2018 11:00' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018' ,city:'Chennai', updatedby:'Admin', updateddt:'12-Nov-2018 11:00' },
      { eventname: 'ARM Workshop', date: '16-Dec-2018' , city:'Chennai', updatedby:'Admin', updateddt:'12-Nov-2018 11:00' },
      { eventname: 'Moksha events', date: '16-Dec-2018', city:'Chennai', updatedby:'Admin', updateddt:'12-Nov-2018 11:00' },
      { eventname: 'Hackathon on UAV', date: '16-Dec-2018', city:'Chennai', updatedby:'Admin', updateddt:'12-Nov-2018 11:00' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018' ,city:'Chennai', updatedby:'Admin', updateddt:'12-Nov-2018 11:00' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018' ,city:'Chennai', updatedby:'Admin', updateddt:'12-Nov-2018 11:00' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018' ,city:'Chennai', updatedby:'Admin', updateddt:'12-Nov-2018 11:00' },
      { eventname: 'ARM Workshop', date: '16-Dec-2018' , city:'Chennai', updatedby:'Admin', updateddt:'12-Nov-2018 11:00' },
      { eventname: 'Mechovation 2k18-19', date: '16-Dec-2018' , city:'Chennai', updatedby:'Admin', updateddt:'12-Nov-2018 11:00' }
    ];
    this.tempFilter = this.data;
  }

  ngOnInit() {}
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
