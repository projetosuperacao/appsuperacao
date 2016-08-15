import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatStorageService} from '../../providers/database/chat-storage-service';
import { UserStorageService } from '../../providers/database/user-storage-service';

@Component({
  templateUrl: 'build/pages/chat/chat.html',
  providers: [ChatStorageService, UserStorageService]
})

export class ChatPage {
  private message: Object;
  private listMessages;
  private userDatas;
  private user2Datas;
  private ctrlFloat = true;

  /*private paramsChat = {
    fromUser : '4htY65BKG9Oh4hmf0ycr1RdUyns1',
    toUser: 'WXop8sxkTNbIvDA4lL42AlVSotz2',
    chatUid: '-KPEAyKxQ1CL1l-J3uys'
  }*/

  constructor(

    private nav: NavController,
    private chat: ChatStorageService,
    private user : UserStorageService) {

    this.user.getUser().then((datas : any) => {
      this.userDatas = datas
    });

    this.listMessages = this.chat.getChat('d3c47ba6-7656-a6ab-1f21-38f52c3a9c76');

    this.listMessages.subscribe((snapshots) => {
    });
  }

  sendMessage() {
    let msgWrapper = {
      uidUser : this.userDatas.$key,
      msg : this.message,
      date: new Date().getTime()
    }

    this.chat.pushMessage(msgWrapper, 'd3c47ba6-7656-a6ab-1f21-38f52c3a9c76');
  }

}
