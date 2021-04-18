import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { IAtendimento, AtendimentoModalComponent } from '../../components/atendimento-modal/atendimento-modal';
import { ETipoURL } from '../../components/atendimento-modal/atendimento-modal';

@IonicPage()
@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html',
})
export class SobrePage {
  public unidades: Array<IAtendimento>

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.unidades = [];
    this.unidades.push({
      tipo: ETipoURL.gps,
      titulo: "Sede Administrativa",
      url: "Rua Antônio de Godoy, 2181 - Jardim Seixas - CEP: 15061-020 - São José do Rio Preto / SP",
      textoAcaoPrincipal: "Ver no mapa",
    });
    this.unidades.push({
      tipo: ETipoURL.gps,
      titulo: "ETA - Estação de Tratamento de Água",
      url: "Rua Antônio de Godoy, 2181 - Jardim Seixas - CEP: 15061-020 - São José do Rio Preto / SP",
      textoAcaoPrincipal: "Ver no mapa",
    });
    this.unidades.push({
      tipo: ETipoURL.gps,
      titulo: "ETE - Estação de Tratamento de Esgoto",
      url: "Rodovia Délcio Custódio da Silva (KM 4,5) - CEP 15048-000 São José do Rio Preto / SP",
      textoAcaoPrincipal: "Ver no mapa",
    });
  }

  public onClick(event, item: IAtendimento) {
    let virtualModal = this.modalCtrl.create(AtendimentoModalComponent, { 'atm': item });
    virtualModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SobrePage');
  }

}
