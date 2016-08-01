import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage, LocalStorage } from 'ionic-angular'
import 'rxjs/add/operator/map';


@Injectable()

export class ScheduleStorageService {

  private schedule: FirebaseListObservable<any>;
  private storage: Storage;

  constructor(private af: AngularFire) {
    this.storage = new Storage(LocalStorage);

    this.storage.get('uid').then((uid) => {
        this.schedule = this.af.database.list('/schedule/' + uid);
    })

  }

  insertEvent(datas) {
    this.schedule.push(datas);
  }

  getEvents() {
    return new Promise((resolve) => {
      this.storage.get('uid').then((uid) => {
        this.af.database.list('/schedule/' + uid).subscribe((snapshots) => {
          resolve(snapshots);
        });
      })
    })
  }



}
