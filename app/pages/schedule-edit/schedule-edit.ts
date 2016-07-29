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
  private localForm : Control;
  private descripForm : Control;
  constructor(private nav: NavController,
  private view: ViewController,
  private fb: FormBuilder,
  private params : NavParams) {

    this.titleForm = new Control("", Validators.required);
    this.dateForm = new Control("", Validators.required);
    this.localForm = new Control("");
    this.descripForm = new Control("");

    this.form = this.fb.group({
      title: this.titleForm,
      date: this.dateForm,
      local: this.localForm,
      description: this.descripForm
    })

  }

  send(datas) {
    console.log(datas);
  }

  close() {
    this.view.dismiss();
  }

}
