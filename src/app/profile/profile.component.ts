import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from '../app.constants';
import { LocalStorageService, MasterService, CommonService, AppCommonService } from '../services';
import * as _ from 'lodash';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { AppMessages } from '../app-messages';
import { MainComponent } from '../layout/main/main.component';
import { LookupService } from '../services/admin';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  socialForm: FormGroup;
  userObj = {} as any;
  userstoragedata = {} as any;
  displayformat = AppConstant.API_CONFIG.ANG_DATE.displaydtime;
  errMessage;
  profileErrObj = AppMessages.VALIDATION.PROFILE;
  cityLists = [];
  cityName: string;
  // locationList = [];
  userimgfile: any;
  userfile: any;
  profileimage: Boolean = false;
  loading = true;
  @ViewChild('userimage') userimage: ElementRef;

  constructor(private mainComponent: MainComponent, private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private userService: MasterService.UserService,
    private bootstrapAlertService: BootstrapAlertService,
    // private locationService: MasterService.LocationService,
    private documentService: AppCommonService.DocumentService,
    private commonService: CommonService,
    private lookupService: LookupService
  ) {
    this.userstoragedata = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER);
  }

  ngOnInit() {
    this.getUser();
    this.userProfileForm();
    // this.getLocationList();
    this.getCity();
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
        this.userObj.token = this.mainComponent.userstoragedata.token;
        userResponse.data.token = this.mainComponent.userstoragedata.token;
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
            city: null,
            // locationid: null
          } as any;
          dealer = this.userObj.dealer == null ? dealer : this.userObj.dealer;
          console.log(dealer);
          this.userObj.city = dealer.location.city;
          // this.userObj.locationid = dealer.locationid == null ? '' : dealer.locationid.toString();
          this.userObj.address = dealer.address;
        } else {
          let consumer = {
            emailid: '',
            city: '',
            // locationid: null,
            socialid: null,
            address: ''
          } as any;
          consumer = this.userObj.consumer == null ? consumer : this.userObj.consumer;
          this.userObj.city = consumer.city;
          // this.userObj.locationid = consumer.locationid == null ? '' : consumer.locationid.toString();
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
    // this.getLocationList();
  }
  userProfileForm() {
    this.profileForm = this.fb.group({
      fullname: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')])],
      mobileno: [null, Validators.required],
      emailid: ['', Validators.compose([Validators.pattern('([a-z0-9&_\.-]*[@][a-z0-9]+((\.[a-z]{2,3})?\.[a-z]{2,3}))'), Validators.maxLength(100)])],
      address: [null, Validators.compose([Validators.minLength(1), Validators.maxLength(100)])],
      city: [null],
      // locationid: [null],
      facebookid: [''],
      twitterid: [''],
      googleid: [''],
      instagramid: [''],
    });
  }
  // getLocationList() {
  //   this.locationService.list({ city: this.cityName, status: AppConstant.STATUS_ACTIVE }).subscribe((res) => {
  //     const response = JSON.parse(res._body);
  //     if (response.status) {
  //       response.data.map(item => {
  //         item.label = item.area + ' ( ' + item.pincode + ' )';
  //         item.value = item.locationid.toString();
  //       });
  //       this.locationList = response.data;
  //     }
  //   });
  // }

  getCity() {
    this.lookupService.list({ refkey: 'biz_businesscity', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.refname;
          item.value = item.refvalue;
        });
        this.cityLists = this.cityLists.concat(response.data);
      }
    });
    // this.getLocationList();
  }
  // selectCity(option) {
  //   this.cityName = option.value;
  //   this.getLocationList();
  // }

  changeProfile(datavalue?) {
    if (!this.profileForm.valid) {
      this.errMessage = this.commonService.getFormErrorMessage(this.profileForm, this.profileErrObj);
      this.bootstrapAlertService.showError(this.errMessage);
      return false;
    } else {
      let data = { ...this.profileForm.value } as any;
      data = _.omit(data, 'mobileno');
      data.updatedby = this.userstoragedata.fullname;
      data.updateddt = new Date();
      // data.locationid = Number(this.profileForm.value.locationid);
      data.socialid = {
        facebookid: data.facebookid,
        twitterid: data.twitterid,
        googleid: data.googleid,
        instagramid: data.instagramid,
      };
      if (this.userObj.mobileno != this.profileForm.value.mobileno) {
        data.frommobileno = this.userObj.mobileno;
        data.tomobileno = this.profileForm.value.mobileno;
      }
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
          this.mainComponent.userstoragedata.mobileno = response.data.mobileno;
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
