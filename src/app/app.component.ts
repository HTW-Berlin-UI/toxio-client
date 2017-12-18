import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UnitOfWork } from '../providers/providers';

import { WELCOME_PAGE } from '../pages/pages.constants';

@Component({
    templateUrl: 'app.html'
})
export class Toxio {
    rootPage: string = WELCOME_PAGE;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        unitOfWork: UnitOfWork
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.overlaysWebView(false);
            statusBar.backgroundColorByHexString('#0d111e');
            splashScreen.hide();
            unitOfWork.init();
        });
    }
}
