import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ScheduleStorageService } from '../../providers/database/schedule-storage-service';
import { UserStorageService } from '../../providers/database/user-storage-service';
import { MatchStorageService } from '../../providers/database/match-storage-service';
import { ChatStorageService } from '../../providers/database/chat-storage-service';
import { DateCustomPipe } from '../../pipes/date-custom-pipe'
import { ChatPage } from '../chat/chat';


@Component({
  templateUrl: 'build/pages/main-chat/main-chat.html',
  providers: [ScheduleStorageService, UserStorageService, MatchStorageService, ChatStorageService],
  pipes: [DateCustomPipe]
})
export class MainChatPage {

  private home = HomePage;
  private profile = ProfilePage;
  private showSchedule : Object;
  private listMatch = [];


  constructor(
    private nav: NavController,
    private schedule: ScheduleStorageService,
    private user: UserStorageService,
    private match: MatchStorageService,
    private chat: ChatStorageService) {

  }

  ngOnInit() {
    this._updateDatas();
  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  openChat(userDatas) {
    this.nav.push(ChatPage, {'user' : userDatas});
  }

  countMsg(chatToken) {
    return this.chat.countMessages(chatToken)
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

  _getListMatch(snapshots) {

    /*snapshots.forEach((snapshot : any) => {
      this.user.findUser(snapshot.$key).subscribe((users) => {
        users.chatToken = snapshot.$value;
        this.listMatch.push(users);

      });
    })*/
  }


}
