import { Component, OnInit } from '@angular/core';
import { NavController, Alert, Modal } from 'ionic-angular';
import { FirebaseAuth, AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { UserStorageService } from '../../providers/user-storage-service/user-storage-service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ProfileEditPage } from '../profile-edit/profile-edit';


@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [UserStorageService]

})

export class ProfilePage {
  private home = HomePage;
  private profileDatas: Promise<any>;

  constructor(private nav: NavController, private user: UserStorageService, private auth : FirebaseAuth) {
    this.profileDatas = this.user.getUserPromise();

  }

  ngOnInit() {


  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  editProfile() {
    let modal = Modal.create(ProfileEditPage);
    this.nav.present(modal);
  }

  logout() {
    this.user.clear();
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

}
