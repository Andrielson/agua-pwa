import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaltadAguaPage } from './faltad-agua';

@NgModule({
  declarations: [
    FaltadAguaPage,
  ],
  imports: [
    IonicPageModule.forChild(FaltadAguaPage),
  ],
  exports: [
    FaltadAguaPage,
  ]
})
export class FaltadAguaPageModule {}
