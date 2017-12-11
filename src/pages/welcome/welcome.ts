import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APP_CONFIG, AppConfig } from '../../app/app.config';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {
    constructor(
        public navCtrl: NavController,
        @Inject(APP_CONFIG) private config: AppConfig
    ) {}

    start(startAsManager: boolean = false): void {
        this.config.currentUser.can.addUsage = startAsManager;
        //this.navCtrl.push('SelectHsPage');
    }
}
