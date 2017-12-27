import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectEntityModalPage } from './select-entity-modal';

@NgModule({
  declarations: [
    SelectEntityModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectEntityModalPage),
  ],
})
export class SelectEntityModalPageModule {}
