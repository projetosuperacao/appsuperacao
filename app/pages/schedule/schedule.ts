import { Component } from '@angular/core';
import { NavController, Modal, Loading, Alert } from 'ionic-angular';
import { DateFilter } from '../components/date-filter';
import { ScheduleEditPage } from '../schedule-edit/schedule-edit';
import { ScheduleStorageService } from '../../providers/database/schedule-storage-service';
import { FirebaseListObservable } from 'angularfire2';
import { DateUtil } from '../../providers/util/date-util';

@Component({
  templateUrl: 'build/pages/schedule/schedule.html',
  directives: [DateFilter],
  providers: [ScheduleStorageService, DateUtil]
})

export class SchedulePage {

  private dateFilter: Date;
  private events : FirebaseListObservable<any>;
  private test;

  constructor(
    private nav: NavController,
    private schedule: ScheduleStorageService,
    private dateUtil: DateUtil) {

    this.dateFilter = new Date();
    this.test = new Date('2016-08-01');
  }

  updateMonth(date : Date) {
    this.dateFilter = date;
    this._updateDatas();
  }

  addSchedule() {
    let modal = Modal.create(ScheduleEditPage);

    modal.onDismiss((datas) => {
      if(!datas) {
        console.log(datas);
        return;
      }

      this.schedule.insertEvent(datas);
      this._updateDatas();
    });

    this.nav.present(modal);
  }

  editSchedule(event) {
    let modal = Modal.create(ScheduleEditPage, {'event': event});

    modal.onDismiss((datas) => {
      if(!datas) {
        console.log(datas);
        return;
      }

      this.schedule.updateEvent(datas);
      this._updateDatas();
    });

    this.nav.present(modal);
  }

  removeSchedule(datas) {
    let alert = Alert.create({
      title: 'Excluir ' + datas.title,
      message: 'Você deseja excluir este evento ?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.schedule.removeEvent(datas);
            this._updateDatas();
          }
        },
        {
          text: 'Não',
          handler: () => {

          }
        }
      ]
    })

    this.nav.present(alert);

  }

  _updateDatas() {
    let firstDay = this.dateUtil.getFirstDay(this.dateFilter);
    let lastDay = this.dateUtil.getLastDay(this.dateFilter);

    console.log(this.dateFilter);

    console.log(firstDay);
    console.log(lastDay);

    let loading = Loading.create({
      content: "Aguarde..."
    });


    this.nav.present(loading).then(() => {
      this.schedule.getEventsDate(firstDay, lastDay).then((datas : FirebaseListObservable<any>) => {
        this.events = datas;
        loading.dismiss();
      })
    });
  }

}
