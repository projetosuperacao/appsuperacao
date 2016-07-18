import {Component} from '@angular/core';
import {NavController, Storage, LocalStorage} from 'ionic-angular';
import {MyApp} from '../../app';

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  public user;

  constructor(private nav: NavController) {

  }

  logout() {
    
  }
}
