import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../services/masters/role.service';
import { AppConstant } from '../app.constants';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/masters/user.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { CommonService } from '../services/common.service';
import { AppMessages } from '../app-messages';
import { LocationService } from '../services/masters';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  passwordForm: FormGroup;
  profileForm: FormGroup;
  socialForm: FormGroup;
  userObj = {} as any;
  userstoragedata = {} as any;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  errMessage;
  profileErrObj = AppMessages.VALIDATION.PROFILE;
  locationList = [];
  userimgfile: any;
  userfile: any;
  fileUrl = AppConstant.IMG_BASE_URL;
  @ViewChild('userimage') userimage: ElementRef;

  constructor(private fb: FormBuilder, private roleService: RoleService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router, private bootstrapAlertService: BootstrapAlertService, private commonService: CommonService,
    private locationService: LocationService,

  ) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.getUser();
    this.initForm();
    this.userProfileForm();
    this.getLocationList();
    this.socialidForm();
    this.getsocialid();
  }
  initForm() {
    this.passwordForm = this.fb.group({
      newpassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
      confirmpassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
    });

  }
  userProfileForm() {
    this.profileForm = this.fb.group({
      fullname: [null, Validators.compose([Validators.required, Validators.minLength(1),
      Validators.maxLength(50), Validators.pattern('^[a-zA-Z]*$')])],
      emailid: ['', Validators.compose([Validators.pattern('([a-z0-9&_\.-]*[@][a-z0-9]+((\.[a-z]{2,3})?\.[a-z]{2,3}))'), Validators.maxLength(100)])],
      address: [null, Validators.compose([Validators.minLength(1), Validators.maxLength(100)])],
      locationid: [null, Validators.compose([])],
      socialid: ['']
    });
  }
  socialidForm() {
    this.socialForm = this.fb.group({
      facebookid: [''],
      twitterid: [''],
      googleid: [''],
      instagramid: [''],
    });
  }
  changePassword() {
    if (this.passwordForm.status === AppConstant.STATUS_INVALID) {
      this.errMessage = this.commonService.getFormErrorMessage(this.passwordForm, this.profileErrObj);
      this.bootstrapAlertService.showError(this.errMessage);
      return false;
    }
    if (this.passwordForm.value['newpassword'] != this.passwordForm.value['confirmpassword']) {
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.PROFILE.newpassword.equal);
      return false;
    }
    let formdata = {} as any;
    formdata.updatedby = this.userstoragedata.fullname;
    formdata.updateddt = new Date();
    formdata.password = this.passwordForm.value.confirmpassword;
    const formData = new FormData();
    formData.append('formData', JSON.stringify(formdata));
    this.userService.update(formData, this.userstoragedata.userid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.bootstrapAlertService.showSucccess(response.message);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
      this.bootstrapAlertService.showError(err.message);

    });
  }
  getUser() {
    this.userService.byId(this.userstoragedata.userid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.userObj = response.data;
        if (this.userObj.profileimg != null) {
          this.userfile = this.fileUrl + '/' + this.userObj.profileimg.docurl;
        }
        let consumer = {
          emailid: '',
          locationid: '',
          socialid: null,
          address: ''
        } as any;
        consumer = this.userObj.consumer == null ? consumer : this.userObj.consumer;
        this.profileForm = this.fb.group({
          fullname: [this.userObj.fullname, Validators.compose([Validators.required, Validators.minLength(1),
          Validators.maxLength(50), Validators.pattern('^[a-zA-Z]*$')])],
          emailid: [consumer.emailid,
          Validators.compose([Validators.pattern('([a-z0-9&_\.-]*[@][a-z0-9]+((\.[a-z]{2,3})?\.[a-z]{2,3}))'), Validators.maxLength(100)])],
          address: [consumer.address, Validators.compose([Validators.minLength(1), Validators.maxLength(100)])],
          locationid: [consumer.locationid == null ? '' : consumer.locationid.toString(), Validators.compose([])],
          socialid: ['']
        });
        if (consumer.socialid != null) {
          const socialids = consumer.socialid.facebookid + ',' + consumer.socialid.twitterid + ',' +
            consumer.socialid.googleid + ',' + consumer.socialid.instagramid;
          this.profileForm.controls['socialid'].setValue(socialids);
        }
        this.socialForm = this.fb.group({
          facebookid: [this.userObj.consumer.socialid.facebookid],
          twitterid: [this.userObj.consumer.socialid.twitterid],
          googleid: [this.userObj.consumer.socialid.googleid],
          instagramid: [this.userObj.consumer.socialid.instagramid]
        });
      }
    });
  }
  changeProfile() {
    if (this.profileForm.status === AppConstant.STATUS_INVALID) {
      this.errMessage = this.commonService.getFormErrorMessage(this.profileForm, this.profileErrObj);
      this.bootstrapAlertService.showError(this.errMessage);
      return false;
    } else {
      let data = {} as any;
      data.updatedby = this.userstoragedata.fullname;
      data.updateddt = new Date();
      data.fullname = this.socialForm.value.fullname;
      data.emailid = this.socialForm.value.emailid;
      data.address = this.socialForm.value.address;
      data.locationid = Number(this.socialForm.value.locationid);
      data.socialid = this.socialForm.value;
      const formData = new FormData();
      if (this.userObj.profileimg != null && this.userObj.profileimg.docid) {
        data.docid = this.userObj.profileimg.docid;
      }
      if (this.userimgfile) {
        formData.append('profileimg', this.userimgfile);
      }
      formData.append('formData', JSON.stringify(data));
      this.userService.update(formData, this.userstoragedata.userid).subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);

        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      }, err => {
        this.bootstrapAlertService.showError(err.message);
      });
    }
  }
  openProfileModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeProfileModal(event) {
    document.querySelector('#' + event).classList.remove('md-show');
  }
  updatePassword() {
    this.openProfileModal('profilemodal');
  }
  closePassword() {
    this.closeProfileModal('profilemodal');
  }
  addSocialId() {
    this.openProfileModal('socialidmodal');
  }
  closeSocialIdModal() {
    this.closeProfileModal('socialidmodal');

  }
  onFile(event) {
    const reader = new FileReader();
    this.userimgfile = event.target.files[0];
    reader.onload = ((e) => {
      this.userfile = e.target['result'];
    });
    reader.readAsDataURL(event.target.files[0]);
  }
  getLocationList() {
    this.locationService.list({}).subscribe((res) => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.area + ' ( ' + item.pincode + ' )';
          item.value = item.locationid.toString();
        });
        this.locationList = response.data;

      }
    });
  }
  getsocialid() {
    let socialids = this.socialForm.value.facebookid + ',' + this.socialForm.value.twitterid + ',' +
      this.socialForm.value.googleid + ',' + this.socialForm.value.instagramid;
    this.profileForm.controls['socialid'].setValue(socialids);
  }
}
