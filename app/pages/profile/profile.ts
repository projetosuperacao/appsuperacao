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
  private test;


  constructor(private nav: NavController,
    private user: UserStorageService,
    private auth : FirebaseAuth,
    private af: AngularFire) {
    this.user.storage.get('uid').then((uid) => {
      this.af.database.object('/users/' + uid).subscribe((data) => {
        let userData = data[Object.keys(data)[0]];

        this.profileDatas = userData;
        this.profileDatas.$key = Object.keys(data)[0];
        this.profileDatas.uid = data.$key;
      });
    })
  }

  ngOnInit() {

  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  editProfile(user) {
    let modal = Modal.create(ProfileEditPage, {'user' : user});

    modal.onDismiss((datas) => {
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
