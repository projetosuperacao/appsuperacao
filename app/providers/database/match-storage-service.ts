import { Injectable, OnInit } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';


@Injectable()

export class MatchStorageService {
  private db;
  constructor(private af: AngularFire) {

  }

  registerMatch(uid : StringConstructor, users) {
    this.db = this.af.database.list('/match/' + uid);
    this.db.push(users);
  }

  getMatch(uid : string) {
    return this.af.database.list('/match/' + uid);
  }
}

/*
  JSON STRUCTURE
  {
    match: [{
      userUid : [{othersUser : 1}]
  }*/
