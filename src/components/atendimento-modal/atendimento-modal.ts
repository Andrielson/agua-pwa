import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

export enum ETipoURL {
  telefone,
  email,
  whatsapp,
  messenger,
  gps
};

export interface IAtendimento {
  tipo: ETipoURL;
  titulo: string;
  url: string;
  url2?: string;
  horario?: string;
  textoAcaoPrincipal: string;
  textoAcaoSecundaria?: string;
  icone?: string;
  cor?: string;
}

@Component({
  selector: 'atendimento-modal',
  templateUrl: 'atendimento-modal.html'
})
export class AtendimentoModalComponent {
  public atv: IAtendimento

  public constructor(private navParams: NavParams, private viewCtrl: ViewController) {
    this.atv = this.navParams.get('atm');
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
