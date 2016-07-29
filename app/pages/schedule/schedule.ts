import { Component } from '@angular/core';
import { NavController, Modal } from 'ionic-angular';
import { DateFilter } from '../components/date-filter';
import { ScheduleEditPage } from '../schedule-edit/schedule-edit';

@Component({
  templateUrl: 'build/pages/schedule/schedule.html',
  directives: [DateFilter]
})

export class SchedulePage {

  private dateFilter: Date;

  constructor(private nav: NavController) {
    this.dateFilter = new Date();
  }

  updateMonth(data : Date) {
    console.log(data);
  }

  addSchedule() {
    let modal = Modal.create(ScheduleEditPage);

    modal.onDismiss(() => {

    });

    this.nav.present(modal);
  }

  editSchedule() {
    let modal = Modal.create(ScheduleEditPage);

    modal.onDismiss(() => {

    });

    this.nav.present(modal);
  }

}
