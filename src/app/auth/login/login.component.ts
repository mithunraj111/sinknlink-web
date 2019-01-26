import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginService } from '../../services/auth/login.service';
import { CommonService } from '../../services/common.service';
import { AppMessages } from '../../app-messages';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginErrObj = AppMessages.VALIDATION.LOGIN;
  errMessage;
  constructor(private localStorageService: LocalStorageService, private commonService: CommonService,
    private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      mobileno: [null, Validators.compose([Validators.required, Validators.maxLength(13)])],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
  }
  login() {
    if (this.loginForm.status === AppConstant.STATUS_INVALID) {
      this.errMessage = this.commonService.getFormErrorMessage(this.loginForm, this.loginErrObj);
      return false;
    } else {
      this.loginService.login(this.loginForm.value).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.localStorageService.addItem(AppConstant.LOCALSTORAGE.USER, response.data);
          this.localStorageService.addItem(AppConstant.LOCALSTORAGE.ISAUTHENTICATED, response.status);
          this.router.navigate(['dashboard']);
        } else {
          this.errMessage = response.message;
        }
      });
    }
  }
}
