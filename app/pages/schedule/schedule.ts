import { Component } from '@angular/core';
import { NavController, Modal } from 'ionic-angular';
import { DateFilter } from '../components/date-filter';
import { ScheduleEditPage } from '../schedule-edit/schedule-edit';
import { ScheduleStorageService } from '../../providers/database/schedule-storage-service';

@Component({
  templateUrl: 'build/pages/schedule/schedule.html',
  directives: [DateFilter],
  providers: [ScheduleStorageService]
})

export class SchedulePage {

  private dateFilter: Date;
  private events;

  constructor(private nav: NavController, private schedule: ScheduleStorageService) {
    this.dateFilter = new Date();

    this.schedule.getEvents().then((datas) => {
      this.events = datas;
    })
  }

  updateMonth(data : Date) {
    console.log(data);
  }

  addSchedule() {
    let modal = Modal.create(ScheduleEditPage);

    modal.onDismiss((datas) => {
      if(!datas) {
        console.log(datas);
        return;
      }
      this.schedule.insertEvent(datas);
    });

    this.nav.present(modal);
  }

  editSchedule() {
    let modal = Modal.create(ScheduleEditPage);

    modal.onDismiss((datas) => {
      if(!datas) {
        console.log(datas);
        return;
      }

      console.log(datas);
    });

    this.nav.present(modal);
  }

}
