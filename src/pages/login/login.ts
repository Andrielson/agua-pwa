import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Loading } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private loadingCtrl: LoadingController,
    private fireAuth: AngularFireAuth) {
    // Cria e exibe um loading para bloquear a tela enquanto a imagem é carregada.
    const loading: Loading = this.loadingCtrl.create({
      content: "Aguarde...",
      enableBackdropDismiss: true
    });
    loading.present();
    this.fireAuth.authState.subscribe((usuario: firebase.User) => {
      if (usuario)
        this.navCtrl.setRoot('HomePage');
      loading.dismiss();
    });
  }

  public onClickLogin() {
    let toast = this.toastCtrl.create({
      message: 'Função ainda não implementada',
      duration: 2000
    });
    toast.present();
  }

  /* public entrarComContaGoogle() {
    // Usando pop-up (acho que funciona melhor com o Ionic Serve)
    var navCtrl = this.navCtrl;
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth.signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
        console.log("getRedirectResult");
        navCtrl.setRoot('HomePage');
      });
  } */

  public entrarComContaGoogle() {
    // Usando redirecionamento
    var navCtrl = this.navCtrl;
    this.fireAuth.auth.getRedirectResult().then(function (result) {
      console.log(result);
      console.log("getRedirectResult");
      navCtrl.setRoot('HomePage');
    });
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.fireAuth.auth.signInWithRedirect(provider);
  }

  public onClickIgnorar() {
    firebase.auth().signInAnonymously().catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // ...
      console.log(error);
    });
    this.navCtrl.setRoot('HomePage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
