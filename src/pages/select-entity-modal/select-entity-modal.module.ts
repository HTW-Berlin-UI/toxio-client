import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectEntityModalPage } from './select-entity-modal';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [SelectEntityModalPage],
    imports: [IonicPageModule.forChild(SelectEntityModalPage), PipesModule]
})
export class SelectEntityModalPageModule {}
