import { Injectable, OnInit } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';



@Injectable()

export class UserStorageService {
  public storage : Storage;
  private db : any
  private uid;

  constructor(private af: AngularFire) {
    this.storage = new Storage(LocalStorage);

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


    let data = {
      provider : result.provider,
      name : result.name,
      email: result.email || null,
      birth: result.birth,
      avatar: result.photoURL || null,
      type_user: "Superador"
    }

    this.db = this.af.database.object('/users/' + result.uid);
    this.db.set(data);
  }


  getUser() {
    let user: any;

    return new Promise((resolve) => {
      this.storage.get('uid').then((uid) => {

          this.af.database.object('/users/' + uid).subscribe((data) => {
              resolve(data);
          });
      });
    });
  }

  updateUser(user, uid) {
    delete user.$key;

    this.db = this.af.database.object('/users/' + uid);
    this.db.set(user)
  }

  findUser(uid) {
    this.db = this.af.database.object('/users/' +uid);
    return this.db;
  }



}
