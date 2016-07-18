import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { FirebaseAuth, AuthProviders, AuthMethods, FirebaseRef, AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserStorageService } from '../../providers/user-storage-service/user-storage-service';
import { LoginPage } from '../login/login';


@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [UserStorageService]

})

export class ProfilePage {
  constructor(private nav: NavController, private user: UserStorageService, private af: AngularFire, private auth : FirebaseAuth) {

  }

  logout() {
    this.user.clear();
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

  ngOnInit() {
    this.auth.subscribe((data) => {
      if(data) {
        console.log(data);
      }
    })
  }

}