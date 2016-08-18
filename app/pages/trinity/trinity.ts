import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ScheduleStorageService } from '../../providers/database/schedule-storage-service';
import { UserStorageService } from '../../providers/database/user-storage-service';
import { ChatStorageService } from '../../providers/database/chat-storage-service';
import { DateCustomPipe } from '../../pipes/date-custom-pipe'
import { TrinityService } from '../../providers/services/trinity-service';
import { ChatPage } from '../chat/chat';


@Component({
  templateUrl: 'build/pages/trinity/trinity.html',
  providers: [ScheduleStorageService, UserStorageService, ChatStorageService, TrinityService],
  pipes: [DateCustomPipe]
})
export class TrinityPage {

  private home = HomePage;
  private profile = ProfilePage;
  private showSchedule : Object;
  private listMatch = [];
  private trinity : any;


  constructor(
    private nav: NavController,
    private schedule: ScheduleStorageService,
    private user: UserStorageService,
    private trinityService: TrinityService,
    private chat: ChatStorageService) {

  }

  ngOnInit() {
    this._updateDatas();
  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  openChat(user2) {
    this.user.getUser().then((user : any) => {
      this.chat.getChat(user.$key, user2.$key).then((snapshot : any) => {
          if(!snapshot) {
            let uid = this.chat.createChat(user.$key, user2.$key);
            this.nav.push(ChatPage, {'user' : user, 'chat' : uid.chatUid});
            return;
          }

          this.nav.push(ChatPage, {'user' : user, 'chat' : snapshot.chatUid});
        })
    })
  }

  countMsg(chatToken) {
    return this.chat.countMessages(chatToken)
  }

  _updateDatas() {
    this.trinity = null;

    this.user.findUser("5vRr9IEYwIZaApvZo1sfsEkidHi1").subscribe((snapshots) => {
      this.listMatch.push(snapshots);
    });

    this.schedule.getCurrentEvent().then((event) => {
      this.showSchedule = event;
    });
  }





}
