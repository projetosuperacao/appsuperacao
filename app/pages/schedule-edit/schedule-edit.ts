import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder, Validators, Control } from '@angular/common';
import { DateUtil } from '../../providers/util/date-util';


@Component({
  templateUrl: 'build/pages/schedule-edit/schedule-edit.html',
  providers: [DateUtil]
})
export class ScheduleEditPage {

  private form;
  private event;

  private titleForm : Control;
  private dateForm : Control;
  private timeForm : Control;
  private localForm : Control;
  private descripForm : Control;
  private privacityForm : Control;

  constructor(private nav: NavController,
  private view: ViewController,
  private fb: FormBuilder,
  private params : NavParams,
  private dateUtil: DateUtil) {
    this.event = this.params.get('event');


    if(this.event) {
       let date = this.dateUtil.formatDate(this.event.date);
       let time = this.dateUtil.formatTime(this.event.date);

       this.titleForm = new Control(this.event.title, Validators.required);
       this.dateForm = new Control(date, Validators.required);
       this.timeForm = new Control(time, Validators.required);
       this.localForm = new Control(this.event.local);
       this.descripForm = new Control(this.event.description);
       this.privacityForm = new Control(this.event.privacity);
    } else {
       this.titleForm = new Control("", Validators.required);
       this.dateForm = new Control("", Validators.required);
       this.timeForm = new Control("", Validators.required);
       this.localForm = new Control("");
       this.descripForm = new Control("");
       this.privacityForm = new Control(false);
     }

    this.form = this.fb.group({
      title: this.titleForm,
      date: this.dateForm,
      time: this.timeForm,
      local: this.localForm,
      description: this.descripForm,
      privacity: this.privacityForm
    })

  }

  send(datas) {
    this.view.dismiss({
      title: datas.title,
      date: this.dateUtil.parseDate(datas.date, datas.time),
      local: datas.local,
      description: datas.description,
      privacity: datas.privacity
    });
  }

  close() {
    this.view.dismiss();
  }

}
