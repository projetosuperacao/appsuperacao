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

  updateEvent(datas) {
    let key = datas.$key;
    delete datas.$key;

    this.schedule.update(key, datas);
  }

  removeEvent(datas) {
    this.schedule.remove(datas.$key);
  }

  getEventsDate(firstDay, lastDay) {
    return new Promise((resolve) => {
      this.storage.get('uid').then((uid) => {
        resolve(this.af.database.list('/schedule/' + uid, {
          query: {
            orderByChild: 'date',
            startAt: firstDay,
            endAt: lastDay
          }
        }));
      })
    })
  }

  getCurrentEvent() {
    return new Promise((resolve) => {
      let date = new Date();

      this.storage.get('uid').then((uid) => {
        this.af.database.list('/schedule/' + uid, {
          query: {
            orderByChild: 'date',
            startAt: date.getTime()
          }
        }).subscribe((snapshots) => {
          resolve(snapshots[0]);
        })
      })
    })
  }



}
