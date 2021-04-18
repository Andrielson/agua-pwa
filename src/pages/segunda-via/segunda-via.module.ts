import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SegundaViaPage } from './segunda-via';

@NgModule({
  declarations: [
    SegundaViaPage,
  ],
  imports: [
    IonicPageModule.forChild(SegundaViaPage),
  ],
  exports: [
    SegundaViaPage,
  ],
})
export class SegundaViaPageModule {}
