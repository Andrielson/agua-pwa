import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public usuario: User;

  public constructor(public navCtrl: NavController, public fireAuth: AngularFireAuth) {
    this.fireAuth.authState.subscribe((usuario: User) => {
      this.usuario = usuario;
    });
  }

}
