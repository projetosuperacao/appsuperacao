import {Component} from '@angular/core';
import {NavController, Storage, LocalStorage} from 'ionic-angular';
import { MainNav } from '../../directives/main-nav/main-nav';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [MainNav]
})
export class HomePage {

  constructor(private nav: NavController) {

  }

}
