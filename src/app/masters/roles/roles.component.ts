import { Component, Input, OnInit } from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  public data: any;
  public rowsOnPage = 8;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';

  public rolename: string;
  public userID: string;
  public userProPic: string;
  public userEmail: string;
  public userPosition: string;
  public userOffice: string;
  public userAge: number;
  public userContact: string;
  public userDate: string;

  @Input('modalDefault') modalDefault: any;

  constructor(public http: Http) { }

  ngOnInit() {
    this.http.get(`assets/data/crm-contact.json`)
      .subscribe((data) => {
        this.data = data.json();
      });
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
