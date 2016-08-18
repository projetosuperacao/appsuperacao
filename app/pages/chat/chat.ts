import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatStorageService} from '../../providers/database/chat-storage-service';

@Component({
  templateUrl: 'build/pages/chat/chat.html',
  providers: [ChatStorageService]
})

export class ChatPage {
  private message: Object;
  private listMessages;
  private user;
  private chatUid;
  private ctrlFloat = true;

  constructor(
    private nav: NavController,
    private params: NavParams,
    private chat: ChatStorageService) {

    this.user = this.params.get('user');
    this.chatUid = this.params.get('chat');

    this.listMessages = this.chat.getMessages(this.chatUid);
  }

  sendMessage() {
    let msgWrapper = {
      uid_user : this.user.$key,
      msg : this.message,
      created_at: new Date().getTime()
    }

    this.chat.pushMessage(msgWrapper, this.chatUid);
  }

}
