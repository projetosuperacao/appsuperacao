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
// ionic plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=AIzaSyCmuXn0awUahCEUhbXB0GP15EwnepG9KOo

export class LoginPage {
  private loading: Loading;
  private page;
  private messages;

  constructor(private nav: NavController, private auth: FirebaseAuth, private user: UserStorageService, private plataform: Platform) {
    this.page = ProfilePage;
    this.messages = {
      email_already : "auth/email-already-in-use",
      email_invalid : "auth/invalid-email",
      email_not_found : "auth/user-not-found",
      password_wrong : "auth/wrong-password",
      weak_password : "auth/weak-password"
    }
  }

  // ===================================== SIGNUP ===================================
  signup(credentials) {
    this.showLoading();

    if(this.validateForm(credentials)) {
      this.showError(this.validateForm(credentials));
      return;
    }

    this.auth.createUser(credentials).then((authData) => {
      this.loading.dismiss();

      // === Register user  ===
      this.user.registerUser({uid: authData.uid, email: credentials.email});

      let prompt = Alert.create({
        title: "Sucesso!",
        subTitle: "Sua conta foi criada com sucesso!",
        buttons: ['Ok']
      });
      this.nav.present(prompt);
    }).catch((error: any) => {
      if(this.messages.email_already === error.code) {
        this.showError("E-mail já cadastrado");
      } else if (this.messages.weak_password === error.code){
        this.showError("A senha deve conter no minimo 6 digitos");
      } else if (this.messages.email_invalid === error.code) {
        this.showError("Digite um e-mail valido!");
      }
    })
  }

  // ===================================== LOGIN ===================================
  login(credentials) {
    this.showLoading();

    if(!credentials.email || !credentials.password) {
      this.showError("Digite todos os campos");
      return;
    }

    this.auth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((authData) => {
        // === Set Storage ===
        this.user.setUid(authData.uid);

        this.loading.dismiss();
        this.nav.setRoot(this.page);
    }).catch((error : any) => {
        if(this.messages.email_invalid === error.code) {
          this.showError("Digite um e-mail valido!");
        } else if (this.messages.password_wrong === error.code) {
          this.showError("Senha incorreta!");
        } else if (this.messages.email_not_found === error.code) {
          this.showError("Este e-mail não está cadastrado!")
        }
        console.log(error);
    })

  }

  // ===================================== LOGIN FACEBOOK ===================================
  loginFacebook() {
    this.showLoading();

    if(!this.plataform.is('cordova')) {
      this.showError('Realize o login em um dispositivo mobile!');
      return;
    }

    Facebook.login(["public_profile", "email", "user_friends"]).then((success) => {

        firebase.auth().signInWithCredential(success.authResponse.accessToken).then((authData) => {
          this.showError(JSON.stringify(authData));
        }).catch((error) => {
          this.showError(JSON.stringify(error));
        })
        /*this.auth.login(success.authResponse.accessToken, {
          provider: AuthProviders.Facebook,
          method: AuthMethods.OAuthToken
        }).then((authData) => {
            this.showError(JSON.stringify(authData));
          })
          .catch((error) => {
            this.showError("Firebase failure: " + JSON.stringify(error));
          });*/

    }).catch((error) => {
        this.showError("Erro!" + JSON.stringify(error));
    })





  }

  // ===================================== LOGIN GOOGLEPLUS ===================================
  loginGoogle() {
    this.showLoading();

    if(!this.plataform.is('cordova')) {
      this.showError('Realize o login em um dispositivo mobile!');
      return;
    }

    GooglePlus.login(["public_profile", "email", "user_friends"]).then((success) => {
      console.log("Facebook success: " + JSON.stringify(success));
        this.auth.login(success.authResponse.accessToken, {
          provider: AuthProviders.Google,
          method: AuthMethods.CustomToken
         }).then((authData) => {
            console.log("Firebase success: " + JSON.stringify(success));
          })
          .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
          });
    }).catch((error) => {
      this.showError(JSON.stringify(error));
    })

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

  validateForm(credentials) : any {
    if(!credentials.email || !credentials.password || !credentials.password_confirm) {
      return 'Preencha todos os campos';
    }

    if(!(credentials.password === credentials.password_confirm)) {
      return 'As senhas digitadas não são iguais';
    }

    return false;
  }

}
