import { Component } from '@angular/core';
import { NavController, Alert, Loading, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';
import { UserStorageService } from '../../providers/user-storage-service/user-storage-service';
import { FORM_DIRECTIVES, FormBuilder, Validators, Control } from '@angular/common';
import { Facebook, GooglePlus } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES],
  providers: [UserStorageService]
})

// cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1740412492881253" --variable APP_NAME="Fiap - SuperAcao"
// cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=236648092205-27k2rhv4oir4m98r1qiaqjl04q6k9ai2.apps.googleusercontent.com
// SHA1 - 4D:FE:9A:38:FD:2F:67:3D:95:C5:1F:BD:AE:25:E8:74:5C:67:ED:7C - keystore

export class LoginPage {
  private loading: Loading;
  private page;
  private messages;
  private ctrlLogo = false;

  // --- FORM DATAS -----
  private formSignup;
  private formLogin;

  private name : Control;
  private email : Control;
  private birth: Control;
  private pass : Control;
  private passConfirm : Control;

  constructor(private nav : NavController,
   private auth : FirebaseAuth,
   private user : UserStorageService,
   private plataform : Platform,
   private fb : FormBuilder) {

  // ===== Validators ======
  this.name = new Control("", Validators.required);
  this.birth = new Control("", Validators.required);
  this.email = new Control("", Validators.required);
  this.pass = new Control("", Validators.compose([Validators.required, Validators.minLength(6)]) );
  this.passConfirm = new Control("", Validators.compose([Validators.required, Validators.minLength(6)]));

  this.formSignup = this.fb.group({
    name: this.name,
    email: this.email,
    birth: this.birth,
    pass: this.pass,
    passConfirm: this.passConfirm
  });

  this.formLogin = this.fb.group({
    email: this.email,
    pass: this.pass
  })


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

    this.auth.createUser({
      email: credentials.email,
      password: credentials.pass
    }).then((authData) => {
      this.loading.dismiss();

      // === Register user  ===
      this.user.registerUser({
        name: credentials.name,
        birth: credentials.birth,
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
    console.log(credentials);
    this.showLoading();

    if(!credentials.email || !credentials.pass) {
      this.showError("Digite todos os campos");
      return;
    }

    this.auth.login({
      email: credentials.email,
      password: credentials.pass
    }, {
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
    if(!credentials.email || !credentials.pass || !credentials.passConfirm) {
      return 'Preencha todos os campos';
    }

    if(!(credentials.pass === credentials.passConfirm)) {
      return 'As senhas digitadas não são iguais';
    }

    return false;
  }

  _validateLoginSocial(authData) {
    this.user.getUser((datas) => {
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
