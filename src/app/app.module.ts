import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ClipboardModule } from 'ngx-clipboard';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
// import { ComponentsModule } from '../components/components.module';
import { FaltaDAguaProvider } from '../providers/falta-d-agua/falta-d-agua';
import { AtendimentoModalComponent } from '../components/atendimento-modal/atendimento-modal';
import { FaltaDAguaModalComponent } from './../components/falta-d-agua-modal/falta-d-agua-modal';
import { CertidaoNegativaProvider } from '../providers/certidao-negativa/certidao-negativa';
import { SegundaViaProvider } from '../providers/segunda-via/segunda-via';
import { SegundaViaModalComponent } from './../components/segunda-via-modal/segunda-via-modal';

registerLocaleData(localePt);

export const firebaseConfig = {
  apiKey: "AIzaSyDzBRlvsNmNlIrhFVsa7d1itWeLPxQKaVw",
  authDomain: "agua-sjriopreto.firebaseapp.com",
  databaseURL: "https://agua-sjriopreto.firebaseio.com",
  projectId: "agua-sjriopreto",
  storageBucket: "agua-sjriopreto.appspot.com",
  messagingSenderId: "963011058611"
};

@NgModule({
  declarations: [
    MyApp,
    AtendimentoModalComponent,
    FaltaDAguaModalComponent,
    SegundaViaModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { backButtonText: 'Voltar' }), //TODO: , { mode: 'md | wp | ios' }
    IonicStorageModule.forRoot({
      name: 'SharedPrefs',
      driverOrder: ['localstorage', 'indexeddb']
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ClipboardModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AtendimentoModalComponent,
    FaltaDAguaModalComponent,
    SegundaViaModalComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FaltaDAguaProvider,
    CertidaoNegativaProvider,
    SegundaViaProvider
  ]
})
export class AppModule { }