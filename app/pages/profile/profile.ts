import { Component, OnInit } from '@angular/core';
import { NavController, Alert, Modal, Loading } from 'ionic-angular';
import { FirebaseAuth, AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { UserStorageService } from '../../providers/user-storage-service/user-storage-service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { SchedulePage } from '../schedule/schedule';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { ScheduleEditPage } from '../schedule-edit/schedule-edit';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [UserStorageService]

})

export class ProfilePage {
  private home = HomePage;
  private profileDatas: any;
  private loading : Loading;

  constructor(private nav: NavController,
    private user: UserStorageService,
    private auth : FirebaseAuth,
    private af: AngularFire) {

  }

  ngOnInit() {
    let loading = Loading.create({
      content: "Aguarde..."
    })

    this.nav.present(loading).then(() => {
      this.user.storage.get('uid').then((uid) => {
        this.af.database.object('/users/' + uid).subscribe((data) => {

          let userData = data[Object.keys(data)[0]];

          this.profileDatas = userData;
          this.profileDatas.$key = Object.keys(data)[0];
          this.profileDatas.uid = data.$key;

          loading.dismiss();
        });
      });
    });
  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  editProfile(user) {
    let modal = Modal.create(ProfileEditPage, {'user' : user});

    modal.onDismiss((datas) => {
      if(!datas) {
        return;
      }

      this.user.updateUser(datas, this.profileDatas.uid);
    });

    this.nav.present(modal);
  }

  openSchedule() {
    this.nav.push(SchedulePage);
  }

  addSchedule() {
    let modal = Modal.create(ScheduleEditPage);

    modal.onDismiss(() => {

    });

    this.nav.present(modal);
  }

  logout() {
    this.user.clear();
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

}
