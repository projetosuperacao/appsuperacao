import { Injectable, OnInit } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';


@Injectable()

export class ChatStorageService {
  private db : FirebaseListObservable<any>;
  private chatUid : string;

  constructor(private af: AngularFire) {

  }

  initChat(uid1 : string, uid2 : string, chatUid?: string) {
    if(!chatUid) {
      this.db = this.af.database.list('/chat');
    }

    this.af.database.list('/chat/' + chatUid);
  }

  pushMessage(datas) {
    this.db.push(datas);
  }

  getChat() {
    return this.db;
  }
}
