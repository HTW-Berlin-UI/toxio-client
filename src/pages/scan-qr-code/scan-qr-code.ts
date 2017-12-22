import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    ViewController,
    AlertController,
    Platform
} from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner';
import { QRCodeProvider } from '../../providers/providers';
import {
    SELECT_HAZARDOUS_SUBSTANCE_PAGE,
    SINGLE_HAZARDOUS_SUBSTANCE_PAGE
} from '../pages.constants';

/**
 * Generated class for the ScanQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-scan-qr-code',
    templateUrl: 'scan-qr-code.html'
})
export class ScanQrCodePage {
    public isLoading: boolean;
    constructor(
        private platform: Platform,
        public navController: NavController,
        public navParams: NavParams,
        public viewController: ViewController,
        private alertController: AlertController,
        private qrScanner: QRScanner,
        private qrCodeProvider: QRCodeProvider
    ) {}

    ionViewDidLoad() {
        this.isLoading = true;
        console.log('ionViewDidLoad ScanQrCodePage');
    }
    ionViewDidEnter() {
        this.isLoading = false;
        if (this.platform.is('cordova'))
            this.qrScanner.getStatus().then(status => {
                if (status.authorized) {
                    console.log('QR Scanner: scan process started');
                    const scanSub = this.qrScanner.scan().subscribe((value: string) => {
                        const result = this.qrCodeProvider.getHazardousSubstanceFor(value);
                        this.qrScanner.hide();
                        scanSub.unsubscribe();
                        if (result) {
                            this.navController
                                .push(SINGLE_HAZARDOUS_SUBSTANCE_PAGE, {
                                    hazardousSubstance: result
                                })
                                .then(() => {
                                    // first we find the index of the current view controller:
                                    const index = this.viewController.index;
                                    // then we remove it from the navigation stack
                                    this.navController.remove(index);
                                });
                        } else {
                            this.handleNotFound();
                        }
                    });

                    this.qrScanner.show();
                }
            });
    }
    ionViewWillLeave() {
        this.isLoading = true;
        this.qrScanner.hide();
    }

    private handleNotFound(): void {
        this.alertController
            .create({
                title: 'Oops...',
                subTitle: 'Dieser QR Code konnte nicht zugeordnet werden.',
                buttons: [
                    {
                        text: 'Ok',
                        handler: () => {
                            this.navController.push(SELECT_HAZARDOUS_SUBSTANCE_PAGE);
                        }
                    }
                ]
            })
            .present();
    }
}
