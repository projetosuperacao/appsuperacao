import { Component, OnInit } from '@angular/core';
import { NavController, Alert, Modal, Loading } from 'ionic-angular';
import { FirebaseAuth, AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { UserStorageService } from '../../providers/database/user-storage-service';
import { ScheduleStorageService } from '../../providers/database/schedule-storage-service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { SchedulePage } from '../schedule/schedule';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { ScheduleEditPage } from '../schedule-edit/schedule-edit';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [UserStorageService, ScheduleStorageService]

})

export class ProfilePage {
  private home = HomePage;
  private profileDatas: any;
  private loading : Loading;

  constructor(private nav: NavController,
    private user: UserStorageService,
    private schedule : ScheduleStorageService,
    private auth : FirebaseAuth,
    private af: AngularFire) {

  }

  ngOnInit() {
    this._updateDatas();
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
      this._updateDatas();
    });

    this.nav.present(modal);
  }

  openSchedule() {
    this.nav.push(SchedulePage);
  }

  addSchedule() {
    let modal = Modal.create(ScheduleEditPage);

    modal.onDismiss((datas) => {
      if(!datas) {
        return;
      }

      this.schedule.insertEvent(datas);
      this.nav.push(SchedulePage);
    });

    this.nav.present(modal);
  }

  _updateDatas() {
    let loading = Loading.create({
      content: "Aguarde..."
    })

    this.nav.present(loading).then(() => {
      this.user.getUser().then((user) => {
        this.profileDatas = user;
        loading.dismiss();
      })
    })
  }

  logout() {
    this.user.clear();
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }



}
