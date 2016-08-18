import { Component } from '@angular/core';
import { NavController, Storage, LocalStorage } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { TrinityPage } from '../trinity/trinity';
import { Push } from 'ionic-native';
import { ScheduleService } from '../../providers/services/schedule-service';


@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ScheduleService]
})

export class HomePage {

  private profile = ProfilePage;
  private trinity = TrinityPage;

  constructor(private nav: NavController, private schedule : ScheduleService ) {

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
    });

    push.on('error', (e) => {
      console.log("Erro!!" + e.message);
    });
  }

}
