import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../app.constants';
import { LocalStorageService, MasterService, CommonService, AppCommonService } from '../services';
import * as _ from 'lodash';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../app-messages';
import { MainComponent } from '../layout/main/main.component';

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
  profileimage: Boolean = false;
  loading = true;
  @ViewChild('userimage') userimage: ElementRef;

  constructor(private mainComponent: MainComponent, private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private userService: MasterService.UserService,
    private bootstrapAlertService: BootstrapAlertService,
    private locationService: MasterService.LocationService,
    private documentService: AppCommonService.DocumentService,
    private commonService: CommonService
  ) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.initForm();
    this.getUser();
    this.userProfileForm();
    this.getLocationList();
  }

  initForm() {
    this.passwordForm = this.fb.group({
      newpassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
      confirmpassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
    });
  }
  checkProfileImg() {
    if (this.userObj.profileimg != null) {
      this.userfile = this.userObj.profileimg.docurl;
      this.profileimage = true;
    } else {
      this.profileimage = false;
      this.userfile = this.userObj.fullname.substring(0, 1);
    }
  }
  updateuser() {
    this.userService.byId(this.userstoragedata.userid).subscribe(result => {
      const userResponse = JSON.parse(result._body);
      if (userResponse.status) {
        this.userObj = userResponse.data;
        this.localStorageService.setItem(AppConstant.LOCALSTORAGE.USER, userResponse.data);
        this.mainComponent.userstoragedata.fullname = userResponse.data.fullname;
        this.mainComponent.checkProfile();
        this.checkProfileImg();
      }
    });
  }

  getUser() {
    this.userService.byId(this.userstoragedata.userid).subscribe(res => {
      const response = JSON.parse(res._body);
      this.loading = false;
      if (response.status) {
        this.userObj = response.data;
        this.checkProfileImg();
        if (this.userstoragedata.roleid == 2) {
          let dealer = {
            address: '',
            locationid: null
          } as any;
          dealer = this.userObj.dealer == null ? dealer : this.userObj.dealer;
          this.userObj.locationid = dealer.locationid == null ? '' : dealer.locationid.toString();
          this.userObj.address = dealer.address;
        } else {
          let consumer = {
            emailid: '',
            locationid: null,
            socialid: null,
            address: ''
          } as any;
          consumer = this.userObj.consumer == null ? consumer : this.userObj.consumer;
          this.userObj.locationid = consumer.locationid == null ? '' : consumer.locationid.toString();
          if (this.userObj.consumer != null) {
            this.userObj.facebookid = consumer.socialid.facebookid;
            this.userObj.twitterid = consumer.socialid.twitterid;
            this.userObj.googleid = consumer.socialid.googleid;
            this.userObj.instagramid = consumer.socialid.instagramid;
          }
        }
        this.profileForm.patchValue(this.userObj);
      }
    });
  }
  userProfileForm() {
    this.profileForm = this.fb.group({
      fullname: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')])],
      emailid: ['', Validators.compose([Validators.pattern('([a-z0-9&_\.-]*[@][a-z0-9]+((\.[a-z]{2,3})?\.[a-z]{2,3}))'), Validators.maxLength(100)])],
      address: [null, Validators.compose([Validators.minLength(1), Validators.maxLength(100)])],
      locationid: [null, Validators.compose([])],
      facebookid: [''],
      twitterid: [''],
      googleid: [''],
      instagramid: [''],
    });
  }
  getLocationList() {
    this.locationService.list({ status: AppConstant.STATUS_ACTIVE }).subscribe((res) => {
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

  changePassword() {
    if (!this.passwordForm.valid) {
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
    formData.append('data', JSON.stringify(formdata));
    this.userService.update(formData, this.userstoragedata.userid).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        this.bootstrapAlertService.showSucccess(response.message);
        this.initForm();
        this.closePassword();
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
      this.bootstrapAlertService.showError(err.message);
    });
  }
  changeProfile(datavalue?) {
    if (!this.profileForm.valid) {
      this.errMessage = this.commonService.getFormErrorMessage(this.profileForm, this.profileErrObj);
      this.bootstrapAlertService.showError(this.errMessage);
      return false;
    } else {
      const data = { ...this.profileForm.value } as any;
      data.updatedby = this.userstoragedata.fullname;
      data.updateddt = new Date();
      data.locationid = Number(this.profileForm.value.locationid);
      data.socialid = {
        facebookid: data.facebookid,
        twitterid: data.twitterid,
        googleid: data.googleid,
        instagramid: data.instagramid,
      };
      const formData = new FormData();
      if (this.userObj.profileimg != null && this.userObj.profileimg.docid) {
        data.docid = this.userObj.profileimg.docid;
      }
      if (this.userimgfile) {
        formData.append('profileimg', this.userimgfile);
      }
      formData.append('data', JSON.stringify(data));
      let service;
      if (datavalue) {
        service = this.userService.update(formData, this.userstoragedata.userid, this.userstoragedata.usertype);
      } else {
        service = this.userService.update(formData, this.userstoragedata.userid);
      }
      service.subscribe(res => {
        const response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.mainComponent.userstoragedata.fullname = response.data.fullname;
          this.updateuser();
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
    this.profileimage = true;
    this.userimgfile = event.target.files[0];
    reader.onload = ((e) => {
      this.userfile = e.target['result'];
    });
    reader.readAsDataURL(event.target.files[0]);
  }

  remove() {
    if (this.userObj.profileimg != null) {
      const data = {} as any;
      const docid = this.userObj.profileimg.docid;
      data.status = AppConstant.STATUS_DELETED;
      const self = this;
      this.documentService.update(data, docid).subscribe(res => {
        const response = JSON.parse(res._body);
        this.profileimage = false;
        this.userfile = this.userObj.fullname.substring(0, 1);
        self.updateuser();
      });
    } else {
      this.profileimage = false;
      this.userfile = '';
    }
  }
}
