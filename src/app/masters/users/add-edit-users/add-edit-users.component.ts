import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../app.constants';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent implements OnInit {

  @Input('modalDefault') modalDefault: any;
  isaddForm= true;
  userid: number;
  buttontext= AppConstant.BUTTON_TXT.SAVE;
  constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.isaddForm = false;
        this.userid = params.id;
        this.buttontext= AppConstant.BUTTON_TXT.UPDATE;
      }
    });
   }
  ngOnInit() {
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
