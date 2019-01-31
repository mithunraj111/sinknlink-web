import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../services/masters/role.service';
import { AppConstant } from '../app.constants';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/masters/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  roleList: any = [];
  userObj = {} as any;
  userstoragedata = {} as any;
  constructor(private fb: FormBuilder, private roleService: RoleService,
    private localStorageService: LocalStorageService,
    private userService: UserService) {
      this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
}

  ngOnInit() {
    this.initForm();
    this.getUser();
  }
  initForm() {
    this.userForm = this.fb.group({
      fullname: [null, Validators.compose([Validators.required, Validators.minLength(1),
      Validators.maxLength(50), Validators.pattern('^[a-zA-Z]*$')])],
      mobileno: [null, Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      Validators.maxLength(13)])],
      rolename: [null, Validators.compose([Validators.required])],
      status: [true],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
    });
  }
  getUser(){
      this.userService.byId(this.userstoragedata.userid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.userObj = response.data;
        }
  });
}
}