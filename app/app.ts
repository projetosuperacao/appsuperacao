import {Component, provide} from '@angular/core';
import {Http} from '@angular/http';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {ProfilePage} from './pages/profile/profile';
import {LoginPage} from './pages/login/login';
import {FIREBASE_PROVIDERS,
  defaultFirebase, AngularFire, AuthMethods, AuthProviders, firebaseAuthConfig, FirebaseAuth} from 'angularfire2';
import {UserStorageService} from './providers/database/user-storage-service';


@Component({
  templateUrl: 'build/app.html',
  providers: [
    UserStorageService,
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "AIzaSyAnTqOEZHBU-1CMx0fKY2v4zFeGvPnvA1I",
      authDomain: "superacao-dc62e.firebaseapp.com",
      databaseURL: "https://superacao-dc62e.firebaseio.com",
      storageBucket: "superacao-dc62e.appspot.com"
    }),
    firebaseAuthConfig({})
  ]
})

export class MyApp {
  private rootPage;
  private home = HomePage;
  private profile = ProfilePage;
  private login = LoginPage;

  constructor(platform: Platform, private auth : FirebaseAuth, private user: UserStorageService) {
    platform.ready().then(() => {
      this.user.storage.get('uid').then(value => {
        if(!value) {
          this.rootPage = this.login;
        } else {
          this.rootPage = this.home;
        }
      })

      StatusBar.styleDefault();
    });


  }

  openPage(page) {
    this.rootPage = page;
  }
}

ionicBootstrap(MyApp);
