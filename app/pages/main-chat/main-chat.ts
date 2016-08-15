import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ScheduleStorageService } from '../../providers/database/schedule-storage-service';
import { UserStorageService } from '../../providers/database/user-storage-service';
import { MatchStorageService } from '../../providers/database/match-storage-service';
import { DateCustomPipe } from '../../pipes/date-custom-pipe'
import { ChatPage } from '../chat/chat';


@Component({
  templateUrl: 'build/pages/main-chat/main-chat.html',
  providers: [ScheduleStorageService, UserStorageService, MatchStorageService],
  pipes: [DateCustomPipe]
})
export class MainChatPage {

  private home = HomePage;
  private profile = ProfilePage;
  private showSchedule : Object;
  private listMatch;

  constructor(
    private nav: NavController,
    private schedule: ScheduleStorageService,
    private user: UserStorageService,
    private match: MatchStorageService) {

  }

  ngOnInit() {
    this._updateDatas();
  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  openChat() {
    this.nav.push(ChatPage);
  }


  _updateDatas() {
    this.user.getUser().then((user : any) => {
      this.match.getMatch(user.$key).subscribe((snapshots) => {
        this._getListMatch(snapshots);
      })
    });

    this.schedule.getCurrentEvent().then((event) => {
      this.showSchedule = event;
    });
  }

  _getListMatch(snapshots : Object[]) {
    snapshots.forEach((snapshot : any) => {
      this.user.findUser(snapshot.$key).subscribe((users) => {
        console.log(users);
      });
    })
  }

}
