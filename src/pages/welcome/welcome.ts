import { Component, Inject } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UnitOfWork } from '../../providers/providers';
import { APP_CONFIG } from '../../app/app.config';
import { Settings } from '../../interfaces/interfaces';

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
        @Inject(APP_CONFIG) private appConfig: Settings,
        public navCtrl: NavController,
        private unitOfWork: UnitOfWork
    ) {}

    ionViewDidLoad() {
        if (this.appConfig.debugMode) this.unitOfWork.init();
    }

    start(startAsManager: boolean = false): void {
        this.appConfig.current.user.can.addUsage = startAsManager;
        this.navCtrl.push(SELECT_HAZARDOUS_SUBSTANCE_PAGE);
    }
}
