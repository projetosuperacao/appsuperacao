import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the ProfileEditPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/profile-edit/profile-edit.html',
})
export class ProfileEditPage {

  constructor(private nav: NavController, private view : ViewController) {

  }

  close() {
    this.view.dismiss();
  }
  

}
