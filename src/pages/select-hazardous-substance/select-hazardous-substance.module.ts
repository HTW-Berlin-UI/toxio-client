import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectHazardousSubstancePage } from './select-hazardous-substance';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [SelectHazardousSubstancePage],
    imports: [IonicPageModule.forChild(SelectHazardousSubstancePage), PipesModule]
})
export class SelectHazardousSubstancePageModule {}
