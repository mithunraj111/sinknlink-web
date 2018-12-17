import { ChangeDetectionStrategy,Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  @Input('modalDefault') modalDefault: any;

  public data: any;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public userProPic: string;
  constructor() {
    this.data = [
      { charity: 'AARP Foundation', startdate: '02-Nov-2018', enddate: '02-Dec-2018', lastupdatedby: 'Admin', lastupdateddt: '02-Dec-2018 15:00' },
      { charity: 'AWP Foundation', startdate: '02-Nov-2018', enddate: '02-Dec-2018', lastupdatedby: 'Admin', lastupdateddt: '02-Dec-2018 15:00' },
      { charity: 'AWP Foundation', startdate: '02-Nov-2018', enddate: '02-Dec-2018', lastupdatedby: 'Admin', lastupdateddt: '02-Dec-2018 15:00' },
      { charity: 'AWP Foundation', startdate: '02-Nov-2018', enddate: '02-Dec-2018', lastupdatedby: 'Admin', lastupdateddt: '02-Dec-2018 15:00' },
      { charity: 'AWP Foundation', startdate: '02-Nov-2018', enddate: '02-Dec-2018', lastupdatedby: 'Admin', lastupdateddt: '02-Dec-2018 15:00' },
      { charity: 'AWP Foundation', startdate: '02-Nov-2018', enddate: '02-Dec-2018', lastupdatedby: 'Admin', lastupdateddt: '02-Dec-2018 15:00' },
      { charity: 'AWP Foundation', startdate: '02-Nov-2018', enddate: '02-Dec-2018', lastupdatedby: 'Admin', lastupdateddt: '02-Dec-2018 15:00' },
      { charity: 'AWP Foundation', startdate: '02-Nov-2018', enddate: '02-Dec-2018', lastupdatedby: 'Admin', lastupdateddt: '02-Dec-2018 15:00' },
      { charity: 'AWP Foundation', startdate: '02-Nov-2018', enddate: '02-Dec-2018', lastupdatedby: 'Admin', lastupdateddt: '02-Dec-2018 15:00' },
      { charity: 'AWP Foundation', startdate: '02-Nov-2018', enddate: '02-Dec-2018', lastupdatedby: 'Admin', lastupdateddt: '02-Dec-2018 15:00' },
      { charity: 'AWP Foundation', startdate: '02-Nov-2018', enddate: '02-Dec-2018', lastupdatedby: 'Admin', lastupdateddt: '02-Dec-2018 15:00' }
    ]
  }

  ngOnInit() {
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
