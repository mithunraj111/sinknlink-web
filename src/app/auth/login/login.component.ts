import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginService } from '../../services/auth/login.service';
import { CommonService } from '../../services/common.service';
import { AppConstant } from 'src/app/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginErrObj = AppConstant.VALIDATION.LOGIN;
  errMessage;
  constructor(private localStorageService: LocalStorageService, private commonService: CommonService,
    private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      mobileno: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
  }
  login() {
    console.log(this.loginForm.status);
    if (this.loginForm.status === 'INVALID') {
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
