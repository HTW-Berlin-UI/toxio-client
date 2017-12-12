import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {
    WELCOME_PAGE,
    SELECT_HAZARDOUS_SUBSTANCE_PAGE
} from '../pages/pages.constants';

@Component({
    templateUrl: 'app.html'
})
export class Toxio {
    rootPage: string = SELECT_HAZARDOUS_SUBSTANCE_PAGE;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.backgroundColorByHexString('#333745');
            splashScreen.hide();
        });
    }
}
