import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'selenium-webdriver';

@Component({
    selector: 'app-image-uploadaer',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImageUploaderComponent implements OnInit {

    @Output() imageAdded: EventEmitter<any> = new EventEmitter();

    images:any = [];

    constructor() { }

    ngOnInit() {

    }

    selectedImg(one, files) {

        var a = this;

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

                let id = Math.ceil(Math.random() * 1234124);

                this.images.push({ image: file, id: (id + 1).toString() });

                var reader = new FileReader();
                reader.onload = function (e) {
                    imageContainer.setAttribute("id", id.toString());
                    imageFile.setAttribute("src", reader.result.toString());
                    imageFile.setAttribute("id", (id + 1).toString());
                    imageFile.addEventListener("click", (el:any)=>{

                        let element = document.getElementById(el.target.id);
                        element.parentNode.removeChild(element);
                        for (let index = 0; index < a.images.length; index++) {
                            const element = a.images[index];
                            if(element.id == el.target.id){
                                a.images.splice(index,1);
                            }
                        }
                        a.imageAdded.emit(a.images);
                    });
                    imageContainer.appendChild(imageFile);
                    reader.abort();
                };
                reader.readAsDataURL(file);
                location[0].appendChild(imageContainer);
            }
        }

        this.imageAdded.emit(this.images);

    }

    removeSelectedImg(el ) {
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
}
