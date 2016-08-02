import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/config/directives';
import { DateUtil } from '../../providers/util/date-util';

@Component({
  selector: 'date-filter',
  directives: [IONIC_DIRECTIVES],
  providers: [DateUtil],
  inputs: ['startDate'],
  outputs: ['changeMonth'],
  template: `
  <ion-row class="months">
    <ion-col width-10>
      <button class="arrow-left" dark clear round (click)="previousMonth()"> <ion-icon name="arrow-dropleft-circle"> </ion-icon> </button>
     </ion-col>

    <ion-col width-80> <h2> {{ dateShow }}</h2> </ion-col>

    <ion-col width-10>
      <button class="arrow-right" dark clear round (click)="nextMonth()"> <ion-icon name="arrow-dropright-circle"> </ion-icon> </button>
    </ion-col>
  </ion-row>
  `
})

export class DateFilter {
  private dateShow;
  private startDate;
  private changeMonth;

  constructor(private dateUtil: DateUtil) {
    this.changeMonth = new EventEmitter();
  }

  _executeChangeMonth() {
    this.changeMonth.next(this.startDate);
  }

  _updateMonth() {
    this.dateShow = this.dateUtil.getMonthName(this.startDate) + " - " + this.startDate.getFullYear();
    this.dateUtil.formatDate(this.startDate);
    this._executeChangeMonth();
  }

  ngOnInit() {
    this._updateMonth();
  }

  previousMonth() {
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this._updateMonth();
  }

  nextMonth() {
    this.startDate.setMonth(this.startDate.getMonth() + 1);
    this._updateMonth();
  }
}
