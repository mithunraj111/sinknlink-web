import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, SimpleChange, OnChanges } from '@angular/core';
import { DocumentService } from 'src/app/services/common/document.service';
import { AppConstant } from 'src/app/app.constants';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { LocalStorageService } from 'src/app/services';
// import { EventEmitter } from 'selenium-webdriver';

@Component({
    selector: 'app-image-uploadaer',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImageUploaderComponent implements OnInit, OnChanges {

    @Output() imageAdded: EventEmitter<any> = new EventEmitter();

    @Input() disablePicker: boolean = false;
    @Input() extimage: any = [1, 2, 3];
    @Input() editMode: boolean = false;

    images: any = [];

    constructor(private localStorageService: LocalStorageService, private documentService: DocumentService, private bootstrapAlertService: BootstrapAlertService) { }

    ngOnInit() {

    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (changes['disablePicker'] && changes['disablePicker'].previousValue != changes['disablePicker'].currentValue) {
            console.log(this.disablePicker);
        }
        if (changes['extimage'] && changes['extimage'].previousValue != changes['extimage'].currentValue) {
            console.log(this.extimage);
        }
        if (changes['editMode'] && changes['editMode'].previousValue != changes['editMode'].currentValue) {

        }
        console.log(changes);
    }

    selectedImg(one, files) {

        var a = this;

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if (
                (file.type == "image/jpg" ||
                    file.type == "image/jpeg" ||
                    file.type == "image/png" ||
                    file.type == "image/bmp" ||
                    file.type == "image/gif") && file.size < AppConstant.MAX_FILE_SIZE
            ) {

                let location = document.getElementsByClassName("imagePicked");
                let imageFile = document.createElement("img");
                let imageDeleteIcon = document.createElement("i");
                imageDeleteIcon.setAttribute("class", "extimage_dicon fa fa-close");
                let imageContainer = document.createElement("div");

                let id = Math.ceil(Math.random() * 1234124);

                this.images.push({ image: file, id: ("img" + (id + 1)).toString() });

                var reader = new FileReader();
                reader.onload = function (e) {
                    imageContainer.setAttribute("id", id.toString());
                    imageContainer.setAttribute("class", "extimage");

                    imageFile.setAttribute("src", reader.result.toString());
                    imageFile.setAttribute("id", (id + 1).toString());
                    imageFile.setAttribute("class", "extImage_img");

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
                    imageContainer.appendChild(imageFile);
                    reader.abort();
                };
                reader.readAsDataURL(file);
                location[0].appendChild(imageContainer);
            }
        }

        this.imageAdded.emit(this.images);

    }

    removeSelectedImg(el) {
        let element = document.getElementById(el.target.id);
        element.parentNode.removeChild(element);

        console.log(this.images);

        console.log(this);

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
