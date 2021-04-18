import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FaltaDAguaResposta } from './../../providers/falta-d-agua/falta-d-agua';

@Component({
  selector: 'falta-d-agua-modal',
  templateUrl: 'falta-d-agua-modal.html'
})
export class FaltaDAguaModalComponent {
  public resposta: FaltaDAguaResposta;

  public constructor(private navParams: NavParams, private viewCtrl: ViewController) {
    this.resposta = this.navParams.get('resposta');
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

}
