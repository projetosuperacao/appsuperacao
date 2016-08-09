import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ScheduleStorageService } from '../../providers/database/schedule-storage-service';
import { DateCustomPipe } from '../../pipes/date-custom-pipe'


@Component({
  templateUrl: 'build/pages/main-chat/main-chat.html',
  providers: [ScheduleStorageService],
  pipes: [DateCustomPipe]
})
export class MainChatPage {

  private home = HomePage;
  private profile = ProfilePage;
  private showSchedule : Object;

  constructor(private nav: NavController, private schedule: ScheduleStorageService) {

  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  ngOnInit() {
    this._updateDatas();
  }

  _updateDatas() {
    this.schedule.getCurrentEvent().then((event) => {
      this.showSchedule = event;
    })
  }

}
