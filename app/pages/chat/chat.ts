import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatStorageService} from '../../providers/database/chat-storage-service';

@Component({
  templateUrl: 'build/pages/chat/chat.html',
  providers: [ChatStorageService]
})
export class ChatPage {

  constructor(private nav: NavController, private chat: ChatStorageService) {

  }

}




/*
  JSON STRUCTURE
  message :
    UID_CHAT :
      UID_SUPERADOR :
        name: 'Nome do usuario',
        msg: 'Mensagem do usuario'
      UID_ANJO :
        name: 'Nome do usuario',
        msg: 'Mensagem do usuario'

*/
