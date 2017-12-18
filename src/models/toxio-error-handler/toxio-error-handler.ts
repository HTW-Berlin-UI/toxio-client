import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { Pro } from '@ionic/pro';

const IonicPro = Pro.init('d247ab47', {
    appVersion: '0.0.1'
});

@Injectable()
export class ToxioErrorHandler implements ErrorHandler {
    ionicErrorHandler: IonicErrorHandler;

    constructor(injector: Injector) {
        try {
            this.ionicErrorHandler = injector.get(IonicErrorHandler);
        } catch (e) {
            // Unable to get the IonicErrorHandler provider, ensure
            // IonicErrorHandler has been added to the providers list below
        }
    }

    handleError(err: any): void {
        IonicPro.monitoring.handleNewError(err);
        // Remove this if you want to disable Ionic's auto exception handling
        // in development mode.
        this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    }
}
