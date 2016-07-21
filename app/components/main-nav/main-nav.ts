import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'main-nav',
  templateUrl: './build/directives/main-nav/main-nav.html'
})

export class MainNav {

  constructor(private nav: NavController) {

  }


  openPage(page) {
    this.nav.setRoot(page);
  }
}
