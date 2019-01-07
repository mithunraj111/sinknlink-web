import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-addroles',
  templateUrl: './addroles.component.html',
  styleUrls: ['./addroles.component.scss']
})
export class AddrolesComponent implements OnInit {

  public data: any;
  roleid: number;
  isaddForm: boolean = true;
  buttontext = AppConstant.BUTTON_TXT.SAVE;

  constructor(
    private route: ActivatedRoute,
    private bootstrapAlertService: BootstrapAlertService
  ) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.roleid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
      }
    });
    this.data = [
      { screenname: 'Dashboard', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'Users', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'Roles', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'Business Category', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'Location', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'Customer', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'Consumer', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'Dealer', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'Events', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'Donations', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'VIP number registration', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'Look up', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' },
      { screenname: 'Reports', dataaccess: 'No', availablepermission: 'View,Create,Edit,Delete', assignedpermission: '-' }
    ]
  }

  ngOnInit() {

  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  getRowHeight(row) {
    return row.height;
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  submit() {
    this.bootstrapAlertService.showSucccess('Saved Successfully');
  }
}

