import { Injectable, OnInit } from '@angular/core';
import { Storage, LocalStorage, Loading } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';



@Injectable()

export class UserStorageService {
  public storage : Storage;
  private db : FirebaseListObservable<any>;
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

    this.db = this.af.database.list('/users/' + result.uid);
    this.db.push(data).then((success) => {
      //console.log(success);
    }).catch((error) => {
      console.log(error);
    });
  }


  getUser() {
    let user: any;

    return new Promise((resolve) => {
      this.storage.get('uid').then((uid) => {
          this.af.database.object('/users/' + uid).subscribe((data) => {
              if(!data.value) {
                resolve(null);
                return;
              }
              
              let userData = data[Object.keys(data)[0]];
              console.log(data);
              user = userData;
              user.uid = data.$key;
              user.$key = Object.keys(data)[0];
              resolve(user);
          });
      });
    });
  }

  updateUser(user, uid) {
    let key = user.$key;
    delete user.$key;

    this.db = this.af.database.list('/users/' + uid);
    this.db.update(key, user).then((success) => {
        console.log('foi!');
    }).catch((error) => {
        console.log(error)
    })
  }



}
