import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from '../../app';
import { HomePage } from '../../pages/home/home';
import { ProfilePage } from '../../pages/profile/profile';

@Component({
  selector: 'main-nav',
  templateUrl: './build/directives/main-nav/main-nav.html'
})

export class MainNav {
  public home = HomePage;
  public profile = ProfilePage;

  constructor(private nav: NavController) {

  }


  openPage(page) {
    this.nav.setRoot(page);
  }
}
