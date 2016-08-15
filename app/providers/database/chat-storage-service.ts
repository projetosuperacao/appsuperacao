import { Injectable, OnInit } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';


@Injectable()

export class ChatStorageService {
  private db : FirebaseListObservable<any>;
  /*private fromUser: string;
  private toUser: string;
  private chatUid: string;*/

  constructor(private af: AngularFire) {

  }

  getChat(chatToken) {
    this.db = this.af.database.list('/chat/' + chatToken);
    return this.db;
  }

  pushMessage(datas,chatToken) {

    if(!chatToken) {
      this.db = this.af.database.list('/chat/' + this._generateChatToken());
      this.db.push(datas);
      console.log(this._generateChatToken());
      return;
    }

    this.db = this.af.database.list('/chat/' + chatToken);
    this.db.push(datas);
    console.log(chatToken);

  }

   _generateChatToken() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
   }
}

/*
  JSON STRUCTURE
  {
    message: [{
      chatUid : [{
        userUid: "",
        message: "",
        date: ""
      }]
    }]
  }*/
