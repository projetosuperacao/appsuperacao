import {Component} from '@angular/core';
import {NavController, Storage, LocalStorage} from 'ionic-angular';
import { MainNav } from '../../components/main-nav/main-nav';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {

  private profile = ProfilePage;

  constructor(private nav: NavController) {

  }

  openPage(page) {
    this.nav.setRoot(page);
  }

}
