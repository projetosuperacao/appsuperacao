import { Component } from '@angular/core';
import { NavController, Alert, Loading, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';
import { UserStorageService } from '../../providers/user-storage-service/user-storage-service';
import { FORM_DIRECTIVES } from '@angular/common';
import { Facebook, GooglePlus } from 'ionic-native';


@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES],
  providers: [UserStorageService]
})

// cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1740412492881253" --variable APP_NAME="Fiap - SuperAcao"
export class LoginPage {
  private loading: Loading;
  private page;

  constructor(private nav: NavController, private auth: FirebaseAuth, private user: UserStorageService, private plataform: Platform) {
    this.page = ProfilePage;
  }

  signup(credentials) {
    this.showLoading();

    this.auth.createUser(credentials).then((authData) => {
      this.loading.dismiss();
      let prompt = Alert.create({
        title: "Sucesso!",
        subTitle: "Sua conta foi criada com sucesso!",
        buttons: ['Ok']
      });
      this.nav.present(prompt);
    }).catch((error) => {
      this.showError(error);
    })
  }

  login(credentials) {
    this.showLoading();
    this.auth.login(credentials).then((authData) => {
      // === Set Storage ===
      this.user.setUid(authData.uid);

      this.loading.dismiss();
      this.nav.setRoot(this.page);
    }).catch((error) => {
      this.showError(error);
    })
  }

  loginFacebook() {
    this.showLoading();

    if(!this.plataform.is('cordova')) {
      this.showError('Realize o login em um dispositivo mobile!');
      return;
    }

    Facebook.login(["public_profile", "email", "user_friends"]).then((success) => {
      console.log("Facebook success: " + JSON.stringify(success));
        this.auth.login(success.authResponse.accessToken, { provider: AuthProviders.Facebook })
          .then((authData) => {
            console.log("Firebase success: " + JSON.stringify(success));
          })
          .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
          });
    }).catch((error) => {
      this.showError(error);
    })


  }

  loginGoogle() {
    this.showLoading();

    if(!this.plataform.is('cordova')) {
      this.showError('Realize o login em um dispositivo mobile!');
      return;
    }

  //   this.auth.login({
  //     provider: AuthProviders.Google,
  //     method: AuthMethods.Popup,
  //   }).then((authData) => {
  //     // === Set Storage ===
  //     this.user.setUid(authData.uid);
  //
  //     this.loading.dismiss();
  //     this.nav.setRoot(this.page);
  //   }).catch((error) => {
  //     this.showError(error);
  //   })
   }

  showLoading() {
    this.loading = Loading.create({
      content: "Aguarde..."
    });
    this.nav.present(this.loading);
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let prompt = Alert.create({
      title: "Falha",
      subTitle: text,
      buttons: ['Ok']
    });

    this.nav.present(prompt);
  }

}
