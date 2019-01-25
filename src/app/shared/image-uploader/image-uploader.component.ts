import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-image-uploadaer',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImageUploaderComponent implements OnInit {

    @Input() modalClass: string;

    totalImages;
    images;

    constructor() { }

    ngOnInit() {

    }

    selectedImg(one, files) {

        var a = this;

        this.totalImages = files.length;
        this.images = [];

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if (
                file.type == "image/jpg" ||
                file.type == "image/jpeg" ||
                file.type == "image/png" ||
                file.type == "image/bmp" ||
                file.type == "image/gif"
            ) {

                let location = document.getElementsByClassName("imagePicked");
                let imageFile = document.createElement("img");
                let imageContainer = document.createElement("span");



                var reader = new FileReader();
                reader.onload = function (e) {
                    imageContainer.setAttribute("id", Math.ceil(Math.random() * 1234124).toString());
                    imageFile.setAttribute("src", reader.result.toString());
                    imageFile.addEventListener("click", a.removeSelectedImg);
                    imageContainer.appendChild(imageFile);
                    reader.abort();
                };
                reader.readAsDataURL(file);
                location[0].appendChild(imageContainer);
            }
        }
    }

    removeSelectedImg(doc) {
        console.log(doc);
    }
}
