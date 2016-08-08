import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

/*
  Generated class for the MainChatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/main-chat/main-chat.html',
})
export class MainChatPage {

  private home = HomePage;
  private profile = ProfilePage;

  constructor(private nav: NavController) {

  }

  openPage(page) {
    this.nav.setRoot(page);
  }

}
