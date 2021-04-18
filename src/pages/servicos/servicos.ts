import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-servicos',
  templateUrl: 'servicos.html',
})
export class ServicosPage {
  servicos: Array<{icone: string, titulo: string, pagina: any}>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.servicos = [];
    this.servicos.push({
      icone: "ribbon",
      titulo: "Certidão negativa de débitos",
      pagina: 'CertidaoNegativaPage'
    });
    this.servicos.push({
      icone: "water",
      titulo: "Consulta falta d'água",
      pagina: 'FaltadAguaPage'
    });
    this.servicos.push({
      icone: "print",
      titulo: "Segunda via de conta",
      pagina: 'SegundaViaPage'
    });
  }

  public servicoClick(event, item) {
    this.navCtrl.push(item.pagina);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicosPage');
  }

}
