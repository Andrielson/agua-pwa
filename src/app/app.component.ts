import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{ title: string, component: any, icone: string }>;

  public constructor(private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe((usuario: firebase.User) => {
      //TODO: melhorar isso aqui
      if (!usuario || usuario.isAnonymous)
        this.pages = [
          { title: 'Início', component: 'HomePage', icone: 'home' },
          { title: 'Serviços', component: 'ServicosPage', icone: 'list-box' },
          { title: 'Atendimento', component: 'AtendimentoPage', icone: 'chatbubbles' },
          { title: 'Sobre', component: 'SobrePage', icone: 'information-circle' },
          { title: 'Login', component: 'LoginPage', icone: 'log-in' }
        ];
      else {
        this.pages = [
          { title: 'Início', component: 'HomePage', icone: 'home' },
          { title: 'Serviços', component: 'ServicosPage', icone: 'list-box' },
          { title: 'Atendimento', component: 'AtendimentoPage', icone: 'chatbubbles' },
          { title: 'Sobre', component: 'SobrePage', icone: 'information-circle' },
          { title: 'Logout', component: 'LogoutPage', icone: 'log-out' }
        ];
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
