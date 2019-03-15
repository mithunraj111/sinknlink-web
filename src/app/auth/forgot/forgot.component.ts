import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ForgotPasswordService } from '../../services/auth/forgotpassword.service';
import { Router } from '@angular/router';
import { AppMessages } from 'src/app/app-messages';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  forgotPasswordErrObj = AppMessages.VALIDATION.FORGOTPASSWORD;
  errMessage;
  sucMessage;
  validatingUser;

  constructor(private commonService: CommonService,
    private fb: FormBuilder, private router: Router,
    private forgotPasswordService: ForgotPasswordService) {
  }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      mobileno: [null, Validators.compose([
        Validators.required, Validators.minLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])]
    });
  }

  sendSMS() {
    if (this.forgotPasswordForm.status === 'INVALID') {
      this.errMessage = this.commonService.getFormErrorMessage(this.forgotPasswordForm, this.forgotPasswordErrObj);
    } else {
      this.validatingUser = true;
      this.forgotPasswordService.sendPassword(this.forgotPasswordForm.value).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.errMessage = '';
          this.sucMessage = response.message;
          this.validatingUser = false;
          window.setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        } else {
          this.sucMessage = '';
          this.errMessage = response.message;
          this.validatingUser = false;
        }
      });
    }
  }

}
