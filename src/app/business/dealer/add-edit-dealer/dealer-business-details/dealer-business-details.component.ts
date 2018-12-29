import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstant } from '../../../../app.constants';

@Component({
  selector: 'app-dealer-business-details',
  templateUrl: './dealer-business-details.component.html',
  styleUrls: ['./dealer-business-details.component.scss']
})
export class DealerBusinessDetailsComponent implements OnInit {
  dealerid: number;
  buttontext = AppConstant.BUTTON_TXT.SAVE;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {

        this.dealerid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
      }
    });
  }

  ngOnInit() {
  }

}
