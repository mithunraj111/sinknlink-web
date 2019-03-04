import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { AppMessages } from '../../app-messages';
import { Router } from '@angular/router';
import { AppConstant } from '../../app.constants';
import { BusinessService, LocalStorageService, CommonService } from '../../services';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginErrObj = AppMessages.VALIDATION.LOGIN;
  errMessage;
  signingin;
  authenticated = {} as any;


  constructor(private commonService: CommonService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private dealerService: BusinessService.DealerService,
    private router: Router) {
    this.loginForm = this.fb.group({
      mobileno: [null, Validators.compose([Validators.required, Validators.maxLength(13)])],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.isLoggedIn()
  }
  isLoggedIn(){
    this.authenticated = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.ISAUTHENTICATED);
    if(this.authenticated==true){
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    if (!this.loginForm.valid) {
      this.errMessage = this.commonService.getFormErrorMessage(this.loginForm, this.loginErrObj);
      return false;
    } else {
      this.signingin = true;
      this.loginService.login(this.loginForm.value).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.signingin = false;
          this.localStorageService.addItem(AppConstant.LOCALSTORAGE.USER, response.data);
          this.localStorageService.addItem(AppConstant.LOCALSTORAGE.ISAUTHENTICATED, response.status);
          if (response.data.role != null) {
            this.localStorageService.addItem(AppConstant.LOCALSTORAGE.SCREENS, response.data.role.uiactions);
          }
          if (response.data.usertype === 'D') {
            this.dealerService.list({ userid: response.data.userid }).subscribe(resp => {
              const result = JSON.parse(resp._body);
              if (result.status) {
                this.localStorageService.addItem(AppConstant.LOCALSTORAGE.DEALER, result.data[0]);
              }
            });
          }
          this.router.navigate(['dashboard']);
        } else {
          this.signingin = false;
          this.errMessage = response.message;
        }
      });
    }
  }

}
