import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder, Validators, Control } from '@angular/common';

@Component({
  templateUrl: 'build/pages/profile-edit/profile-edit.html',
  directives: [FORM_DIRECTIVES]
})
export class ProfileEditPage {

  private form;
  private user;

  private name : Control;
  private birth : Control;
  private type_user : Control;

  constructor(private nav: NavController,
    private view : ViewController,
    private params : NavParams,
    private fb : FormBuilder) {

    this.user = this.params.get('user');

    // Validators
    this.name = new Control(this.user.name, Validators.required);
    this.birth = new Control("");
    this.type_user = new Control(this.user.type_user, Validators.required);

    this.form = this.fb.group({
      name : this.name,
      birth: this.birth,
      type_user : this.type_user
    })
  }



  close() {
    this.view.dismiss();
  }

  update(datas) {
    if(datas.valid) {
      datas.value.$key = this.user.$key;
      this.view.dismiss(datas.value);
    }
  }


}
