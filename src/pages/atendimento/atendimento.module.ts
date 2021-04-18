import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtendimentoPage } from './atendimento';
// import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AtendimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(AtendimentoPage),
    // ComponentsModule,
  ],
  exports: [
    AtendimentoPage
  ]
})
export class AtendimentoPageModule {}
