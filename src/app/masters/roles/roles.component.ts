import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

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

  constructor(private router: Router) { 
    this.data=[
      { rolename: 'Admin', dataaccess: 'Team', updatedby: 'Mithun', updateddt: '20-Dec-2018 20:12' },
      { rolename: 'Operator', dataaccess: 'Team', updatedby: 'Raj', updateddt: '20-Dec-2018 20:12' },
      { rolename: 'Manager', dataaccess: 'Team', updatedby: 'Mithunraj', updateddt: '20-Dec-2018 20:12' },
      { rolename: 'Admin', dataaccess: 'Team', updatedby: 'Mithun', updateddt: '20-Dec-2018 20:12' },
      { rolename: 'Operator', dataaccess: 'Team', updatedby: 'Raj', updateddt: '20-Dec-2018 20:12' },
      { rolename: 'Manager', dataaccess: 'Team', updatedby: 'Mithunraj', updateddt: '20-Dec-2018 20:12' },
      { rolename: 'Admin', dataaccess: 'Team', updatedby: 'Mithun', updateddt: '20-Dec-2018 20:12' },
      { rolename: 'Operator', dataaccess: 'Team', updatedby: 'Mithunraj', updateddt: '20-Dec-2018 20:12' },
      { rolename: 'Manager', dataaccess: 'Team', updatedby: 'Raj', updateddt: '20-Dec-2018 20:12' },
      { rolename: 'Admin', dataaccess: 'Team', updatedby: 'Mithun', updateddt: '20-Dec-2018 20:12' },
      { rolename: 'Operator', dataaccess: 'Team', updatedby: 'Mithunraj', updateddt: '20-Dec-2018 20:12' },
      { rolename: 'Manager', dataaccess: 'Team', updatedby: 'Raj', updateddt: '20-Dec-2018 20:12' }
    ];
    this.tempFilter = this.data;
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
  addRole() {
    this.router.navigate(['masters/roles/create']);
  }
  editRole(data) {
    this.router.navigate(['masters/roles/edit/' + 1]);
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
