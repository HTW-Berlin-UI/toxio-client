import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUsagePage } from './add-usage';

@NgModule({
  declarations: [
    AddUsagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddUsagePage),
  ],
})
export class AddUsagePageModule {}
