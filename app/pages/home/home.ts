import { Component } from '@angular/core';
import { NavController, Storage, LocalStorage } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { UserStorageService } from '../../providers/database/user-storage-service';

declare let firebase: any;

@Component({
  templateUrl: 'build/pages/home/home.html',
    providers: [UserStorageService]
})

export class HomePage {

  private profile = ProfilePage;

  constructor(private nav: NavController, private user: UserStorageService) {

  }

  openPage(page) {
    this.nav.setRoot(page);
  }

}
