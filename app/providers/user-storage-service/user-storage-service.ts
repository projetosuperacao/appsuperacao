import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()

export class UserStorageService {
  public storage : Storage;

  constructor() {
    this.storage = new Storage(SqlStorage);
  }

  setUid(uid) {
    this.storage.set('uid', uid);
  }

  clear() {
    this.storage.clear();
  }



}
