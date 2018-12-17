import { Component, OnInit } from '@angular/core';

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
  showDetails = false;
  showRegion = false;
  constructor() { 
    this.data=[
      { eventname: 'Moksha events', date: '16-Dec-2018', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'12-Nov-2018 11:00' },
      { eventname: 'Hackathon on UAV', date: '16-Dec-2018', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'12-Nov-2018 11:00' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018' ,city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'12-Nov-2018 11:00' },
      { eventname: 'ARM Workshop', date: '16-Dec-2018' , city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'12-Nov-2018 11:00' },
      { eventname: 'Moksha events', date: '16-Dec-2018', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'12-Nov-2018 11:00' },
      { eventname: 'Hackathon on UAV', date: '16-Dec-2018', city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'12-Nov-2018 11:00' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018' ,city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'12-Nov-2018 11:00' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018' ,city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'12-Nov-2018 11:00' },
      { eventname: 'TEDxGCT 2018', date: '16-Dec-2018' ,city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'12-Nov-2018 11:00' },
      { eventname: 'ARM Workshop', date: '16-Dec-2018' , city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'12-Nov-2018 11:00' },
      { eventname: 'Mechovation 2k18-19', date: '16-Dec-2018' , city:'Chennai', lastupdatedby:'Admin', lastupdateddt:'12-Nov-2018 11:00' }
    ]
  }

  ngOnInit() {}
 openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
