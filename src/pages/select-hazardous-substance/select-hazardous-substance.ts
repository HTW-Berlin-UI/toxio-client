import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { HazardousSubstanceRepository } from '../../providers/providers';
import { HazardousSubstance } from '../../interfaces/interfaces';
import { Observable } from 'rxjs/Observable';
import { SINGLE_HAZARDOUS_SUBSTANCE_PAGE, SCAN_QR_CODE_PAGE } from '../pages.constants';

/**
 * Generated class for the SelectHazardousSubstancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-select-hazardous-substance',
    templateUrl: 'select-hazardous-substance.html'
})
export class SelectHazardousSubstancePage {
    public hazardousSubstances: Observable<HazardousSubstance[]>;
    public textFilter: string;
    public qrScannerStatus: QRScannerStatus;

    constructor(
        public navCtrl: NavController,
        private alertController: AlertController,
        private hazardousSubstancesRepository: HazardousSubstanceRepository,
        private qrScanner: QRScanner
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad SelectHazardousSubstancePage');
        this.hazardousSubstances = this.hazardousSubstancesRepository.all();
        this.handleQRScanStatus(this.qrScanner.prepare());
    }

    search(event: Event): void {
        this.textFilter = (<HTMLInputElement>event.target).value;
    }

    select(hazardousSubstance: HazardousSubstance): void {
        this.navCtrl.push(SINGLE_HAZARDOUS_SUBSTANCE_PAGE, {
            hazardousSubstance: hazardousSubstance
        });
    }

    scan(): void {
        this.navCtrl.push(SCAN_QR_CODE_PAGE);
    }

    private handleQRScanStatus(initScanner: Promise<QRScannerStatus>): void {
        initScanner
            .then(status => {
                if (!status.authorized) {
                    this.handleQRScanError('camera permission denied');
                    console.log('status denied');
                }
                this.qrScannerStatus = status;
            })
            .catch((e: any) => {
                console.log('Error while initializing qr code scanner', e);
            });
    }

    private handleQRScanError(errorMessage: string): void {
        this.alertController
            .create({
                title: 'Oops...',
                subTitle: 'QR Code kann nicht gelesen werden.',
                message: errorMessage,
                buttons: ['Ok']
            })
            .present();
    }
}
