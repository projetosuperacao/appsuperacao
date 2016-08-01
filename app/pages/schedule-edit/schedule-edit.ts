import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder, Validators, Control } from '@angular/common';


@Component({
  templateUrl: 'build/pages/schedule-edit/schedule-edit.html',
})
export class ScheduleEditPage {

  private form;

  private titleForm : Control;
  private dateForm : Control;
  private timeForm : Control;
  private localForm : Control;
  private descripForm : Control;
  private privacityForm : Control;

  constructor(private nav: NavController,
  private view: ViewController,
  private fb: FormBuilder,
  private params : NavParams) {

    this.titleForm = new Control("", Validators.required);
    this.dateForm = new Control("", Validators.required);
    this.timeForm = new Control("", Validators.required);
    this.localForm = new Control("");
    this.descripForm = new Control("");
    this.privacityForm = new Control(false);

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
    this.view.dismiss(datas);
  }

  close() {
    this.view.dismiss();
  }

}
