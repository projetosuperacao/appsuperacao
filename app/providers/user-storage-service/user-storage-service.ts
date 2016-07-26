import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';


@Injectable()

export class UserStorageService {
  public storage : Storage;
  private db : FirebaseListObservable<any>;

  constructor(private af: AngularFire) {
    this.storage = new Storage(LocalStorage);
  }

  setUser(datas) {
    this.storage.set('uid', datas.uid);
    this.storage.set('email', datas.auth.email);
    //this.storage.set('name', datas.name);
    this.storage.set('uid', datas.auth.provider);
  }

  setUid(uid) {
    this.storage.set('uid', uid);
  }

  clear() {
    this.storage.clear();
  }

  registerUser(result) {
    if(result.auth) {
      result.photoURL = result.auth.photoURL;
      result.name = result.auth.displayName;
      result.email = result.auth.email;
    }

    console.log(result.name);

    let data = {
      provider : result.provider,
      name : result.name || null,
      email: result.email || null,
      avatar: result.photoURL || null
    }

    this.db = this.af.database.list('/users/' + result.uid);
    this.db.push(data).then((success) => {
      //console.log(success);
    }).catch((error) => {
      console.log(error);
    });
  }

  getUser(callBack) {
    this.storage.get('uid').then((uid) => {
      this.af.database.list('/users/' + uid).subscribe((snapshots) => {
        let result = {
          user: snapshots["0"],
          length: snapshots.length
        }
        callBack(result);
      });
    });
  }

  /*getUserPromise() {
    return new Promise((resolve) => {
      this.storage.get('uid').then((uid) => {
        this.af.database.list('/users/' + uid).subscribe((snapshots) => {
          let result = {
            user: snapshots["0"],
            length: snapshots.length
          }
          resolve(result);
        });
      });
    });
  }*/

}
