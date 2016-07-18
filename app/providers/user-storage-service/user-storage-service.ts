import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';


@Injectable()

export class UserStorageService {
  public storage : Storage;
  private db : FirebaseListObservable<any>;

  constructor(private af: AngularFire) {
    this.storage = new Storage(SqlStorage);
  }

  setUid(uid) {
    this.storage.set('uid', uid);
  }

  clear() {
    this.storage.clear();
  }

  registerUser(data) {
    this.db = this.af.database.list('/users');
    this.db.push(data).then((sucess) => {
      console.log(sucess);
    }).catch((error) => {
      console.log(error);
    });
  }



}
