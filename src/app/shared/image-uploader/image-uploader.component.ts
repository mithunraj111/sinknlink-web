import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, SimpleChange, OnChanges } from '@angular/core';
import { DocumentService } from 'src/app/services/common/document.service';
import { AppConstant } from 'src/app/app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { LocalStorageService } from 'src/app/services';
import * as _ from 'lodash';
// import { EventEmitter } from 'selenium-webdriver';

@Component({
    selector: 'app-image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImageUploaderComponent implements OnInit, OnChanges {

    @Output() imageAdded: EventEmitter<any> = new EventEmitter();

    @Input() disablePicker = false;
    @Input() extimage = [] as any;
    @Input() editMode = false;
    @Input() limit: any;

    images: any = [];
    fileList: any;
    constructor(private localStorageService: LocalStorageService,
        private documentService: DocumentService,
        private bootstrapAlertService: BootstrapAlertService) { }

    ngOnInit() {

    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (changes['disablePicker'] && changes['disablePicker'].previousValue != changes['disablePicker'].currentValue) {
        }
        if (changes['extimage'] && changes['extimage'].previousValue != changes['extimage'].currentValue) {
        }
        if (changes['editMode'] && changes['editMode'].previousValue != changes['editMode'].currentValue) {

        }
    }

    selectedImg(one, files) {


        var a = this;
        let videocount = 0;
        let imagecount = 0;
        if (a.extimage && a.extimage.length > 0) {
            for (let i = 0; i < a.extimage.length; i++) {
                if (a.extimage[i].doctype == 'image') {
                    imagecount++;
                }
                if (a.extimage[i].doctype == 'video') {
                    videocount++;
                }
            }
        }
        a.fileList = files;
        if (a.images && a.images.length > 0) {
            a.fileList = _.map(a.images, function (item: any) { return item.image; });
            _.map(files, function (i: any) { a.fileList.push(i); });
        }
        for (let i = 0; i < a.fileList.length; i++) {
            const file = a.fileList[i];
            if (file.type.match('image/*')) {
                imagecount++;
            }
            if (file.type.match('video/*')) {
                videocount++;
            }
        }

        if ((a.limit) && ((imagecount > a.limit[1] && videocount == 0) ||
            (videocount > 1 && imagecount == 0) || (imagecount > a.limit[1] && videocount > a.limit[0])
            || (imagecount <= a.limit[1] && videocount > a.limit[0]) || (imagecount > a.limit[1] && videocount == a.limit[0]))) {
            this.bootstrapAlertService.showError('You are only allowed to upload a maximum of 5 images and 1 video');
        } else {
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                if (
                    (file.type == "image/jpg" ||
                        file.type == "image/jpeg" ||
                        file.type == "image/png" ||
                        file.type == "image/bmp" ||
                        file.type == "image/gif" || file.type == 'video/mp4' ||
                        file.type == 'video/3gp' || file.type == 'video/wmv') && file.size < AppConstant.MAX_FILE_SIZE
                ) {
                    let location = document.getElementsByClassName("imagePicked");

                    let imageDeleteIcon = document.createElement("i");
                    imageDeleteIcon.setAttribute("class", "extimage_dicon fa fa-close");
                    let imageContainer = document.createElement("div");
                    let imageFile;
                    if (file.type.match('image/*')) {
                        imageFile = document.createElement("img");
                    }
                    let videoFile;
                    if (file.type.match('video/*')) {
                        videoFile = document.createElement("video");
                    }
                    let id = Math.ceil(Math.random() * 1234124);

                    this.images.push({ image: file, id: ("img" + (id + 1)).toString() });

                    var reader = new FileReader();
                    reader.onload = function (e: any) {
                        imageContainer.setAttribute("id", id.toString());
                        imageContainer.setAttribute("class", "extimage");
                        imageDeleteIcon.setAttribute("id", ("img" + id).toString());
                        imageDeleteIcon.addEventListener("click", (el: any) => {

                            let parentNode = document.getElementById(el.target.parentNode.id);

                            while (parentNode.firstChild) parentNode.removeChild(parentNode.firstChild);

                            let imgid = "img" + (parseInt(el.target.id.split("img")[1]) + 1);

                            for (let index = 0; index < a.images.length; index++) {
                                const element = a.images[index];
                                if (element.id == imgid) {
                                    a.images.splice(index, 1);
                                }
                            }
                            a.imageAdded.emit(a.images);
                        });
                        imageContainer.appendChild(imageDeleteIcon);
                        if (file.type.match('image/*')) {
                            imageFile.setAttribute("src", e.target.result.toString());
                            imageFile.setAttribute("id", (id + 1).toString());
                            imageFile.setAttribute("class", "extImage_img");
                            imageContainer.appendChild(imageFile);
                        }

                        if (file.type.match('video/*')) {

                            videoFile.setAttribute("src", e.target.result.toString());
                            videoFile.setAttribute("id", (id + 1).toString());
                            videoFile.setAttribute("class", "video-responsive");
                            videoFile.setAttribute('width', '320');
                            videoFile.setAttribute('height', '240');
                            videoFile.setAttribute('controls', 'controls');
                            imageContainer.appendChild(videoFile);
                        }

                        // reader.abort();
                    };
                    reader.readAsDataURL(file);
                    location[0].appendChild(imageContainer);
                }
            }

            this.imageAdded.emit(this.images);
        }


    }

    removeSelectedImg(el) {
        let element = document.getElementById(el.target.id);
        element.parentNode.removeChild(element);



        // for (let index = 0; index < this.images.length; index++) {
        //     const element = this.images[index];
        //     if(element.id == el.target.id){
        //         this.images.splice(index,1);
        //     }
        // }

        // this.imageAdded.emit(this.images);
    }

    removeDoc(doc, id) {
        this.documentService.update({
            docid: doc.docid,
            status: AppConstant.STATUS_DELETED,
            updateddt: new Date(),
            updatedby: this.localStorageService.getItem(AppConstant.LOCALSTORAGE.USER).fullname
        }, doc.docid).subscribe(res => {
            let response = JSON.parse(res._body);
            if (response.status) {
                let parentNode = document.getElementById("img" + id);
                while (parentNode.firstChild) parentNode.removeChild(parentNode.firstChild);
                this.bootstrapAlertService.showSucccess(response.message);
            } else {
                this.bootstrapAlertService.showError(response.message);
            }
        }, err => {
            console.log(err);
        });
    }

}
