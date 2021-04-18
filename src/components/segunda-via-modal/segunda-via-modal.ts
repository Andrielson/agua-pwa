import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { SegundaViaResposta } from './../../providers/segunda-via/segunda-via';

@Component({
  selector: 'segunda-via-modal',
  templateUrl: 'segunda-via-modal.html'
})
export class SegundaViaModalComponent {
  public resposta: SegundaViaResposta;

  public constructor(private navParams: NavParams, private viewCtrl: ViewController, private toastCtrl: ToastController) {
    this.resposta = this.navParams.get('resposta');
  }

  public exibeToastCodigo() {
    const toast = this.toastCtrl.create({
      message: 'Código de barras copiado!',
      duration: 2000
    });
    toast.present();
  }

  public visualizarConta() {
    window.open(this.resposta.url);
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

}
