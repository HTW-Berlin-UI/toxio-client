import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUsagePage } from './add-usage';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AddUsagePage],
    imports: [IonicPageModule.forChild(AddUsagePage), ReactiveFormsModule]
})
export class AddUsagePageModule {}
