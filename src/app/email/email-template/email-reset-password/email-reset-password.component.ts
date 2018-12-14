import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-email-reset-password',
  templateUrl: './email-reset-password.component.html',
  styleUrls: ['./email-reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmailResetPasswordComponent implements OnInit {

  constructor() {
    document.querySelector('body').setAttribute('yahoo', 'fix');
    document.querySelector('body').setAttribute('style', 'margin: 0; padding:0; background-color: #34495E; background-image: none;');
  }

  ngOnInit() {
  }

}
