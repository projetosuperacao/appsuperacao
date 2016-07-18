import { Component } from '@angular/core';
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

  constructor() {

  }

  /*
  openPage(page) {
    this.app.openPage(page);
  }*/
}
