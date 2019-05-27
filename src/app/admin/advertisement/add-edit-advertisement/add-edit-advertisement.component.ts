import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from '../../../app.constants';
import { NgbDateCustomParserFormatter } from '../../../shared/elements/dateParser';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { AppMessages } from 'src/app/app-messages';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AdminService } from '../../../services';
import { LookupService } from 'src/app/services/admin';

@Component({
  selector: 'app-add-edit-advertisement',
  templateUrl: './add-edit-advertisement.component.html',
  styleUrls: ['./add-edit-advertisement.component.scss'], providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class AddEditAdvertisementComponent implements OnInit {

  isaddForm = true;
  adid: number;
  edit = false;
  buttontext = AppConstant.BUTTON_TXT.SAVE;
  status = true;
  ispremium = false;
  adObj = {} as any;
  savingAd = false;
  adForm: FormGroup;
  adErrObj = AppMessages.VALIDATION.ADVERTISEMENT;
  errMessage;
  sucMessage;
  processingad;
  statelists = [];
  categorylist = [];
  images: any = [];
  existing_image: any = [];
  cityList = [];
  mallsList = [];
  cityName: string;
  lookupList: any = [];

  constructor(private localStorageService: LocalStorageService,
    private bootstrapAlertService: BootstrapAlertService,
    private commonService: CommonService,
    private fb: FormBuilder, private route: ActivatedRoute,
    private adService: AdminService.AdvertisementService,
    private router: Router,
    private lookupService: LookupService
  ) {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.adid = params.id;
        this.buttontext = AppConstant.BUTTON_TXT.UPDATE;
        this.getAdDetail(this.adid);
      }
    });
  }
  ngOnInit() {
    this.initAdForm();
    this.getCity(); 
    this.getcategory();
  }
  getCity () {
    this.lookupService.list({ refkey: 'biz_businesscity', status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.label = item.refname;
          item.value = item.refvalue;
        });
        this.cityList = this.cityList.concat(response.data);
      }
    });
  }
  selectCity(option) {
    this.cityName = option.value;
    this.mallsList = [];
    this.lookupList.forEach(element => {
      if (element.refname === option.value) {
        this.mallsList.push(element);
      }
    });
    this.adForm.get('locationid').setValidators(Validators.required);
    this.adForm.get('locationid').updateValueAndValidity();
    this.getLocations();
  }
  getLocations() {
    this.adService.getLocations({ city: this.cityName, status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.value = item.locationid.toString();
          item.label = item.area + '(' + item.pincode + ')';
        });
        this.statelists = response.data;
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
    });
  }
  getcategory() {
    this.adService.getCategory({ status: AppConstant.STATUS_ACTIVE }).subscribe(res => {
      const response = JSON.parse(res._body);
      if (response.status) {
        response.data.map(item => {
          item.value = item.categoryid.toString();
          item.label = item.categoryname;
        });
        this.categorylist = response.data;
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
    });
  }

  initAdForm() {
    this.adForm = this.fb.group({
      adname: [null, [Validators.required]],
      city: [null, [Validators.required]],
      locationid: [null, [Validators.required]],
      categoryid: [null, [Validators.required]],
      url: [null, [Validators.required]],
      startdate: [null, [Validators.required]],
      expirydate: [null, [Validators.required]],
      ispremium: [null],
      description: [null, [Validators.required]],
      status: ['Active']
    });
  }
  getAdDetail(id) {
    this.adService.byId(id).subscribe(res => {
      this.edit = true;
      let response = JSON.parse(res._body);
      let adObj = response.data;
      adObj.locationid = adObj.locationid.toString();
      adObj.categoryid = adObj.categoryid.toString();
      adObj.ispremium = adObj.ispremium == AppConstant.AD_PREMIUM ? true : false;
      adObj.startdate = this.commonService.parseDate(adObj.startdate);
      adObj.expirydate = this.commonService.parseDate(adObj.expirydate);
      adObj.status = response.data.status == AppConstant.STATUS_ACTIVE ? true : false;
      this.adForm = this.fb.group({
        adname: [adObj.adname, [Validators.required]],
        city: [adObj.city, Validators.required],
        locationid: [adObj.locationid, [Validators.required]],
        categoryid: [adObj.categoryid, [Validators.required]],
        url: [adObj.url, [Validators.required]],
        startdate: [adObj.startdate, [Validators.required]],
        expirydate: [adObj.expirydate, [Validators.required]],
        ispremium: [adObj.ispremium],
        description: [adObj.description, [Validators.required]],
        status: [adObj.status]
      });
      this.existing_image = [];
      this.existing_image = response.data.adimages;
    }, err => {
      this.savingAd = false;
    });
    this.getLocations();
  }

  addAd() {
    this.savingAd = true;
    if (!this.adForm.valid) {
      this.savingAd = false;
      this.bootstrapAlertService.showError(this.commonService.getFormErrorMessage(this.adForm, this.adErrObj));
      return false;
    }
    let data = this.adForm.value;
    data.startdate = this.commonService.formatDate(data.startdate);
    data.ispremium = data.ispremium ? AppConstant.AD_PREMIUM : AppConstant.AD_NOTPREMIUM;
    data.expirydate = this.commonService.formatDate(data.expirydate);
    data.status = data.status ? AppConstant.STATUS_ACTIVE : AppConstant.STATUS_INACTIVE;
    if (new Date(data.expirydate) < new Date(data.startdate)) {
      this.savingAd = false;
      this.bootstrapAlertService.showError(AppMessages.VALIDATION.ADVERTISEMENT.startdate.max);
      return false;
    }
    if (this.edit) {
      data['updateddt'] = new Date();
      data['updatedby'] = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;
      this.updateAd(data);
    } else {
      data.createddt = new Date();
      data.createdby = this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname;
      let formData = new FormData();
      for (let index = 0; index < this.images.length; index++) {
        const element = this.images[index];
        formData.append('files', element.image);
      }
      formData.append('data', JSON.stringify(data));
      this.adService.create(formData).subscribe(res => {
        this.savingAd = false;
        let response = JSON.parse(res._body);
        if (response.status) {
          this.bootstrapAlertService.showSucccess(response.message);
          this.router.navigate(['/admin/advertisement/']);
        } else {
          this.bootstrapAlertService.showError(response.message);
        }
      }, err => {
        this.savingAd = false;
      });
    }
  }

  imageAdded(files) {
    this.images = files;
  };

  updateAd(data) {

    let formData = new FormData();
    for (let index = 0; index < this.images.length; index++) {
      const element = this.images[index];
      formData.append('files', element.image);
    }
    formData.append('data', JSON.stringify(data));
    this.adService.update(formData, this.adid).subscribe(res => {
      this.savingAd = false;
      let response = JSON.parse(res._body);
      if (response.status) {
        this.bootstrapAlertService.showSucccess(response.message);
        this.router.navigate(['/admin/advertisement/']);
      } else {
        this.bootstrapAlertService.showError(response.message);
      }
    }, err => {
      this.savingAd = false;
    });
  }
}
