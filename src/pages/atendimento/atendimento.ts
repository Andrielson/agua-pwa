import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { IAtendimento, AtendimentoModalComponent } from '../../components/atendimento-modal/atendimento-modal';
import { ETipoURL } from '../../components/atendimento-modal/atendimento-modal';

@IonicPage()
@Component({
  selector: 'page-atendimento',
  templateUrl: 'atendimento.html',
})
export class AtendimentoPage {
  public atendsVirtual: Array<IAtendimento>
  public atendsPresencial: Array<IAtendimento>

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.atendsVirtual = [];
    this.atendsVirtual.push({
      tipo: ETipoURL.telefone,
      titulo: "Call Center",
      url: "0800-770-6666",
      url2: "tel:08007706666",
      horario: "Segunda a Sexta das 6h à meia noite; Sábado, Domingo e Feriado das 7h às 19h",
      textoAcaoPrincipal: "Ligar",
      icone: "call",
      cor: "black",
    });
    this.atendsVirtual.push({
      tipo: ETipoURL.email,
      titulo: "Email",
      url: "semae@semae.riopreto.sp.gov.br",
      horario: "Segunda a Sexta das 7h30 às 17h",
      textoAcaoPrincipal: "Enviar email",
      icone: "mail",
      cor: "black",
    });
    this.atendsVirtual.push({
      tipo: ETipoURL.email,
      titulo: "Messenger",
      url: "@SeMae.RioPreto",
      url2: "fb-messenger://user/165196603556754",
      horario: "Segunda a Sexta das 7h30 às 17h",
      textoAcaoPrincipal: "Enviar mensagem",
      icone: "logo-facebook",
      cor: "facebook",
    });
    this.atendsVirtual.push({
      tipo: ETipoURL.whatsapp,
      titulo: "WhatsApp",
      url: "(17) 99629-5917",
      url2: "https://api.whatsapp.com/send?phone=5517996295917",
      horario: "Segunda a Sexta das 7h30 às 17h",
      textoAcaoPrincipal: "Enviar mensagem",
      textoAcaoSecundaria: "Adicionar",
      icone: "logo-whatsapp",
      cor: "whatsapp",
    });

    this.atendsPresencial = [];
    this.atendsPresencial.push({
      tipo: ETipoURL.gps,
      titulo: "Poupatempo",
      url: "Rua Antônio de Godoy, 3003, Centro",
      url2: "http://maps.google.com/maps?q=-20.8136205,-49.3788269(Poupatempo)",
      horario: "Segunda a Sexta das 8h às 17h e aos Sábados das 8h às 13h",
      textoAcaoPrincipal: "Ver no mapa",
      icone: "contacts",
    });
    this.atendsPresencial.push({
      tipo: ETipoURL.gps,
      titulo: "Ganhatempo",
      url: "Shopping Cidade Norte - entrada 3",
      url2: "http://maps.google.com/maps?q=-20.7692672,-49.3857088(Ganha Tempo Cidadão)",
      horario: "Segunda a Sexta das 10h às 19h e aos Sábados das 10h às 15h",
      textoAcaoPrincipal: "Ver no mapa",
      icone: "contacts",
    });
  }

  public onClick(event, item: IAtendimento) {
    let virtualModal = this.modalCtrl.create(AtendimentoModalComponent, { 'atm': item });
    virtualModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtendimentoPage');
  }

}
