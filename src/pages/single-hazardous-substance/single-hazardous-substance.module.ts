import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleHazardousSubstancePage } from './single-hazardous-substance';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
    declarations: [SingleHazardousSubstancePage],
    imports: [IonicPageModule.forChild(SingleHazardousSubstancePage), NgxQRCodeModule]
})
export class SingleHazardousSubstancePageModule {}
