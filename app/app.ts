import {Component, provide} from '@angular/core';
import {Http} from '@angular/http';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {ProfilePage} from './pages/profile/profile';
import {LoginPage} from './pages/login/login';
import {FIREBASE_PROVIDERS,
  defaultFirebase, AngularFire, AuthMethods, AuthProviders, firebaseAuthConfig, FirebaseAuth} from 'angularfire2';
import {UserStorageService} from './providers/user-storage-service/user-storage-service';


@Component({
  templateUrl: 'build/app.html',
  providers: [
    UserStorageService,
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "AIzaSyBO8ng45OzFcvbR3ds_mcv4n-5V5AH8k7c",
      authDomain: "projetosuperacao-e1827.firebaseapp.com",
      databaseURL: "https://projetosuperacao-e1827.firebaseio.com",
      storageBucket: "projetosuperacao-e1827.appspot.com"
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
          return;
        }
      })

      this.rootPage = this.home;

      StatusBar.styleDefault();
    });


  }

  openPage(page) {
    this.rootPage = page;
  }
}

ionicBootstrap(MyApp);
