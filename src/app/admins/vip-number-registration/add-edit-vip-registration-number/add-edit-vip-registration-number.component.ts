import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { AppMessages } from '../../../app-messages';
import { FancyNumberService } from '../../../services/admin/fancynumber.service';

@Component({
  selector: 'app-add-edit-vip-registration-number',
  templateUrl: './add-edit-vip-registration-number.component.html',
  styleUrls: ['./add-edit-vip-registration-number.component.scss']
})
export class AddEditVipRegistrationNumberComponent implements OnInit {

  vipForm: FormGroup;
  vipErrObj = AppMessages.VALIDATION.FORGOTPASSWORD;
  errMessage;
  sucMessage;
  validatingUser;

  constructor(private commonService: CommonService,
    private fb: FormBuilder, private router: Router) {
    this.vipForm = this.fb.group({
      statecode: [null],
      startnumber: [null, [Validators.required]],
      endnumber: [],
      cost: [null, [Validators.required]],
      status: [false, [Validators.required]]
    });
  }

  ngOnInit() {
  }
  addNumber() {
    console.log(this.vipForm.value);
  }
}
