import { Injectable, OnInit } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';


@Injectable()

export class MatchStorageService {
  private db : FirebaseListObservable<any>;
  private subject : BehaviorSubject<any>;

  constructor(private af: AngularFire) {
    this.subject = new BehaviorSubject(null)
  }

  registerMatch(uid, users) {
    this.db = this.af.database.list('/match/' + uid);
    this.db.push(users);
  }

  getMatch(uid) {
    return new Promise((resolve) => {

      this.af.database.list('/match/' + uid).subscribe((snapshots) =>{
        this.subject.next(snapshots);
      })

      if(!this.subject.getValue()) {
          this.af.database.list('/match/' + uid).subscribe((snapshots) =>{
            resolve(snapshots);
          });
          return;
      }

      resolve(this.subject.getValue());
    });
  }
}

/*
  JSON STRUCTURE
  {
    match: [{
      userUid : [{othersUser : 1}]
  }*/
