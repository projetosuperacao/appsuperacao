import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, Loading } from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder, Validators, Control } from '@angular/common';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/profile-edit/profile-edit.html',
  directives: [FORM_DIRECTIVES]
})
export class ProfileEditPage {

  private form;
  private user;
  private loading: Loading;

  private name : Control;
  private birth : Control;
  private type_user : Control;
  private photo;
  private backgroundImg = "https://placehold.it/150x150"

  constructor(private nav: NavController,
    private view : ViewController,
    private params : NavParams,
    private fb : FormBuilder) {

    this.user = this.params.get('user');

    // Validators
    this.name = new Control(this.user.name, Validators.required);
    this.birth = new Control("");
    this.type_user = new Control(this.user.type_user, Validators.required);
    this.photo = this.user.avatar || "https://placehold.it/150x150";
    this.backgroundImg = this.user.back_img || "https://placehold.it/150x150";

    this.form = this.fb.group({
      name : this.name,
      birth: this.birth,
      address : [this.user.address],
      phone: [this.user.phone],
      religion: [this.user.religion],
      civilState: [this.user.civilState],
      type_user : this.type_user
    })
  }



  close() {
    this.view.dismiss();
  }

  update(datas) {
    if(datas.valid) {
      datas.value.$key = this.user.$key;

      datas.value.avatar = this.photo;
      datas.value.back_img = this.backgroundImg;
      this.view.dismiss(datas.value);
    }
  }


  openPhoto() {
    this.showLoading();
    let options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: Camera.MediaType.PICTURE,
        saveToPhotoAlbum: true

    };
    Camera.getPicture(options).then((imgData) => {
      window['plugins'].crop.promise(imgData, {
        quality: 75
      }).then((newPath) => {
        this.toBase64(newPath).then((base64Img) => {
          this.photo = base64Img;
          this.loading.dismiss();
        });
      }).catch((error) => {
        console.log("Fail!!" + error);
        this.loading.dismiss();
      });
    }).catch((error) => {
      this.loading.dismiss();
      console.log("Fail!! " + error);
    })
  }

  openBackground() {
    this.showLoading();

    let options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: Camera.MediaType.PICTURE,
        saveToPhotoAlbum: true

    };

    Camera.getPicture(options).then((imgData) => {
      window['plugins'].crop.promise(imgData, {
        quality: 75
      }).then((newPath) => {
        this.toBase64(newPath).then((base64Img) => {
          this.backgroundImg = base64Img;
          console.log(base64Img);
          this.loading.dismiss();
        });
      }).catch((error) => {
        console.log("Fail!!" + error);
        this.loading.dismiss();
      });;

    }).catch((error) => {
      this.loading.dismiss();
      console.log("Fail!! " + error);
    })
  }

  toBase64(url: string) {
    return new Promise<string>(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.send();
        });
  }


  showLoading() {
    this.loading = Loading.create({
      content : "Aguarde..."
    });
    this.nav.present(this.loading);
  }

}
