import { Component } from '@angular/core';
import { NavController, Storage, LocalStorage } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { Push } from 'ionic-native';


@Component({
  templateUrl: 'build/pages/home/home.html',
})

export class HomePage {

  private profile = ProfilePage;

  constructor(private nav: NavController) {

  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  notification() {
    var push = Push.init({
      android: {
        senderID: '236648092205'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    })

    push.on('registration', (data) => {
      console.log(data.registrationId);
    });

    push.on('notification', (data) => {
      console.log(data.message);
      console.log(data.title);
      console.log(data.count);
      console.log(data.sound);
      console.log(data.image);
      console.log(data.additionalData);
    });

    push.on('error', (e) => {
      console.log("Erro!!" + e.message);
    });
  }

}
