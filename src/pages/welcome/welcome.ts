import { Component, Inject } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { APP_CONFIG, AppConfig } from '../../app/app.config';
import { UnitOfWork } from '../../providers/providers';

import { SELECT_HAZARDOUS_SUBSTANCE_PAGE } from '../pages.constants';

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
        @Inject(APP_CONFIG) private appConfig: AppConfig,
        private unitOfWork: UnitOfWork
    ) {}

    ionViewDidLoad() {
        this.unitOfWork.init();
    }

    start(startAsManager: boolean = false): void {
        this.appConfig.currentUser.can.addUsage = startAsManager;
        this.navCtrl.push(SELECT_HAZARDOUS_SUBSTANCE_PAGE);
    }
}
