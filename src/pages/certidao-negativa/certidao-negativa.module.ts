import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CertidaoNegativaPage } from './certidao-negativa';

@NgModule({
  declarations: [
    CertidaoNegativaPage,
  ],
  imports: [
    IonicPageModule.forChild(CertidaoNegativaPage),
  ],
  exports: [
    CertidaoNegativaPage
  ]
})
export class CertidaoNegativaPageModule {}
