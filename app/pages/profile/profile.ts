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
  private profileDatas: any;

  constructor(private nav: NavController, private user: UserStorageService, private auth : FirebaseAuth) {

  }

  ngOnInit() {
    this.user.getUserPromise().then((datas) => {
      this.profileDatas = datas;
    })

  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  editProfile(user) {
    let modal = Modal.create(ProfileEditPage, {'user' : user});

    modal.onDismiss((datas) => {
      console.log(datas);
      this.user.updateUser(datas, this.profileDatas.uid);
    })

    this.nav.present(modal);
  }

  logout() {
    this.user.clear();
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

}
