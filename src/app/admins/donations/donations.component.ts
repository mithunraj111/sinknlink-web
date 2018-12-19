import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  @Input('modalDefault') modalDefault: any;
  closeResult: string;
  // ariaLabelledBy:string;
  public data: any;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public userProPic: string;
  openResult: { ariaLabelledBy: string; };

  constructor(private router: Router,
    public modalService: NgbModal, public activeModal: NgbActiveModal) {
    console.log(activeModal)
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
  open(content) {
    this.modalService.open(content);
  }
  close(content) {
    this.activeModal.close()
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
  addDonations() {
    this.router.navigate(['admins/donations/create']);
  }
  editDonations(data) {
    this.router.navigate(['admins/donations/edit/' + 1]);
  }
}
