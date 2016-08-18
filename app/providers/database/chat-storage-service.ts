import { Injectable, OnInit } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';


@Injectable()

export class ChatStorageService {
  private db : FirebaseListObservable<any>;
  private subject : BehaviorSubject<any>;
  /*private fromUser: string;
  private toUser: string;
  private chatUid: string;*/

  constructor(private af: AngularFire) {
    this.subject = new BehaviorSubject([]);
  }

  getChat(user1, user2) {
    return new Promise((resolve) => {
      this.af.database.object('/chat', {
        query: {
          orderByChild: 'users',
          startAt: user1,
          endAt: user2
        }
      }).subscribe((snapshot) => {
        resolve(snapshot[Object.keys(snapshot)[0]]);
      })

    });
  }


  createChat(userUid1, userUid2) {
    let datas = {
      chatUid : this._generateChatToken(),
      users: {}
    }

    datas.users[userUid1] = 1;
    datas.users[userUid2] = 1;

    this.db = this.af.database.list('/chat/');
    this.db.push(datas);

    return {chatUid: datas.chatUid};
  }


  getMessages(chatUid) {
    return this.af.database.list('/messages/' + chatUid);
  }

  countMessages(chatUid) {
    return new Promise((resolve) => {
      this.af.database.list('/messages/' + chatUid).subscribe((snapshots) => {
        resolve(snapshots.length);
      });
    });
  }

  pushMessage(datas, chatUid) {
    this.db = this.af.database.list('/messages/' + chatUid);
    this.db.push(datas);
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
