import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataExchangeProvider } from '../../providers/data-exchange/data-exchange';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    constructor(
        public navCtrl: NavController,
        private dataProvider: DataExchangeProvider
    ) {}
}
