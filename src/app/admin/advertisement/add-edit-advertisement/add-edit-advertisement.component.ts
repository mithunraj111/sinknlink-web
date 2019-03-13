import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../../../app.constants';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService, AdminService } from "../../../services";

@Component({
  selector: 'app-add-edit-advertisement',
  templateUrl: './add-edit-advertisement.component.html',
  styleUrls: ['./add-edit-advertisement.component.scss'],  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class AddEditAdvertisementComponent implements OnInit {
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  savingAd:false;
  adForm:FormGroup;
  constructor(private fb: FormBuilder, private commonService:CommonService,
    private advertisementService:AdminService.AdvertisementService) { }

  ngOnInit() {
    this.initAdForm();
  }
  initAdForm() {
    this.adForm = this.fb.group({
      adname: [null, [Validators.required]],
      eventdate: [null, [Validators.required]],
      eventexpirydt: [null, [Validators.required]],
       description: [null, [Validators.required]],
      status: ['Active']
    });
  }
  
  addAd(){
    let data = this.adForm.value;
    data.eventdate = this.commonService.formatDate(data.eventdate);
    data.eventexpirydt = this.commonService.formatDate(data.eventexpirydt);
    data.status = data.status?AppConstant.STATUS_ACTIVE:AppConstant.STATUS_INACTIVE;
  }

}
