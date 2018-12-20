import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { IOption } from 'ng-select';
import { SelectOptionService } from '../../../shared/elements/select-option.service';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../app.constants';

@Component({
  selector: 'app-addroles',
  templateUrl: './addroles.component.html',
  styleUrls: ['./addroles.component.scss']
})
export class AddrolesComponent implements OnInit {
  public rowsOnPage = 8;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public data: any;

  public rolename: string;
  public userID: string;
  public userProPic: string;
  public userEmail: string;
  public userPosition: string;
  public userOffice: string;
  public userAge: number;
  public userContact: string;
  public userDate: string;

  simpleOption: Array<IOption> = this.selectOptionService.getCharacters();
  selectedOption = '4';
  isDisabled = true;
  characters: Array<IOption>;
  selectedCharacter = '4';
  timeLeft = 5;

  public static readonly PLAYER_ONE: Array<IOption> = [
    { value: '0', label: 'View' },
    { value: '1', label: 'Create' },
    { value: '2', label: 'Edit' },
    { value: '3', label: 'Delete' },
  ];

  @Input('modalDefault') modalDefault: any;
  roleid: number;
  isaddForm: boolean =true;
  buttontext= AppConstant.BUTTON_TXT.SAVE;

  constructor(
    public selectOptionService: SelectOptionService, 
    public http: Http,
    private route: ActivatedRoute
    ) { 
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.roleid = params.id;
        this.buttontext= AppConstant.BUTTON_TXT.UPDATE;
      }
    });
    this.data=[
      { screenname:'Dashboard', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'Users', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'Roles', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'Business Category', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'Location', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'Customer', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'Consumer', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'Dealer', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'Events', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'Donations', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'VIP number registration', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'Look up', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'},
      { screenname:'Reports', dataaccess:'No', availablepermission:'View,Create,Edit,Delete', assignedpermission: '-'}
    ]
  }

  ngOnInit() {
    // this.http.get(`assets/data/crm-contact.json`)
    //   .subscribe((data) => {
    //     this.data = data.json();
    //   });
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  openMyModalData(event) {
    this.rolename = this.data[event]['name'];
    this.userID = this.data[event]['id'];
    this.userProPic = this.data[event]['image'];
    this.userEmail = this.data[event]['email'];
    this.userPosition = this.data[event]['position'];
    this.userOffice = this.data[event]['office'];
    this.userAge = this.data[event]['age'];
    this.userContact = this.data[event]['phone_no'];
    this.userDate = this.data[event]['date'];
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

}

