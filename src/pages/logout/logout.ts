import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Classe controladora da página de Logout.
 *
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  public confirmacao: Alert;

  public constructor(public navCtrl: NavController, public navParams: NavParams, private fireAuth: AngularFireAuth, public alertCtrl: AlertController) {
    this.configuraConfirmacao();
    this.confirmacao.present();
  }

  private configuraConfirmacao() {
    this.confirmacao = this.alertCtrl.create({
      title: 'Confirme o logoff',
      message: 'Tem certeza que deseja se desconectar do aplicativo?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Não',
          handler: () => {
            this.navCtrl.setRoot('HomePage');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.fireAuth.auth.signOut().then((result) => {
              console.log("Usuário desconectado!");
              this.navCtrl.setRoot('LoginPage');
            }, (error) => {
              console.log("Erro ao desconectar usuário!");
            });
          }
        }
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
