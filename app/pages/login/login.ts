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
// ionic plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=236648092205-buoo42f7tfit2ojq3bf1jjcmnrgjchg3.apps.googleusercontent.com
// SHA1 - 4D:FE:9A:38:FD:2F:67:3D:95:C5:1F:BD:AE:25:E8:74:5C:67:ED:7C - keystore

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

    if(this._validateForm(credentials)) {
      this.showError(this._validateForm(credentials));
      return;
    }

    this.auth.createUser(credentials).then((authData) => {
      this.loading.dismiss();

      // === Register user  ===
      this.user.registerUser({
        name: credentials.name,
        provider: authData.provider,
        uid: authData.uid,
        email: credentials.email});

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
      console.log(error);
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
        console.log(credentials);
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

    Facebook.login(["public_profile", "email", "user_friends"]).then((success) => {
        let creds = (firebase.auth.FacebookAuthProvider as any).credential(success.authResponse.accessToken)

        this.auth.login(creds, {
          provider: AuthProviders.Facebook,
          method: AuthMethods.OAuthToken,
          remember: 'default',
          scope: ['email']
        }).then((authData) => {
          // === Set Storage ===
          this.user.setUid(authData.uid);
          // === Set database ===
          this._validateLoginSocial(authData);

          this.loading.dismiss();
          this.nav.setRoot(HomePage);

        }).catch((error) => {
          console.log(error);
          this.showError("Firebase failure:");
        });

    }).catch((error) => {
      this.loading.dismiss();
      console.log(error);
    })



  }

  // ===================================== LOGIN GOOGLEPLUS ===================================
  loginGoogle() {
    this.showLoading();
    GooglePlus.login({}).then((success) => {
      console.log(success);
      let creds = (firebase.auth.GoogleAuthProvider as any).credential(success.authResponse.accessToken)


      this.auth.login(creds, {
        provider: AuthProviders.Google,
        method: AuthMethods.OAuthToken,
        remember: 'default',
        scope: ['email']
      }).then((authData) => {
        // === Set Storage ===
        this.user.setUid(authData.uid);
        // === Set database ===
        this._validateLoginSocial(authData);

        this.loading.dismiss();
        this.nav.setRoot(this.page);
        console.log(authData);

      }).catch((error) => {
        console.log(error);
        this.showError("Firebase failure:");
      });
    }).catch((error) => {
      this.showError("Não logo!" + JSON.stringify(error));
      console.log(error);
    })
   }

  // ===================================== OTHERS METHODS ===================================
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
      title: "Ops! Ocorreu um erro!",
      subTitle: text,
      buttons: ['Ok']
    });

    this.nav.present(prompt);
  }

  _validateForm(credentials) : any {
    if(!credentials.email || !credentials.password || !credentials.password_confirm) {
      return 'Preencha todos os campos';
    }

    if(!(credentials.password === credentials.password_confirm)) {
      return 'As senhas digitadas não são iguais';
    }

    return false;
  }

  _validateLoginSocial(authData) {
    this.user.getUser(authData.uid, (datas) => {
      if(!datas.length) {
        this.user.registerUser(authData);
        return;
      }
    });
  }

  _FBUserProfile() {
   return new Promise((resolve, reject) => {
     Facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(100).height(100).as(picture_small),picture.width(720).height(720).as(picture_large)', [])
       .then((profileData) => {
         console.log(JSON.stringify(profileData));
         return resolve(profileData);
       }, (err) => {
         console.log(JSON.stringify(err));
         return reject(err);
       });
   });
 }

}
