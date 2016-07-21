import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { FirebaseAuth, AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserStorageService } from '../../providers/user-storage-service/user-storage-service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [UserStorageService]

})

export class ProfilePage {
  private home = HomePage;

  constructor(private nav: NavController, private user: UserStorageService, private auth : FirebaseAuth) {

  }
  openPage(page) {
    this.nav.setRoot(page);
  }

  logout() {
    this.user.clear();
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

}
