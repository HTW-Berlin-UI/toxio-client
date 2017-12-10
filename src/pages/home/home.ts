import { Component, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataExchangeProvider } from '../../providers/data-exchange/data-exchange';
import { APP_CONFIG, AppConfig } from '../../app/app.config';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    constructor(
        public navCtrl: NavController,
        private dataProvider: DataExchangeProvider,
        @Inject(APP_CONFIG) private config: AppConfig
    ) {
        console.log('kanna');
        console.log(this.config.currentUser.can.addUsage);
    }
}
