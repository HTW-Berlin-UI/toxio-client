import { Component, Inject, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HazardousSubstance } from '../../interfaces/interfaces';
import { APP_CONFIG } from '../../app/app.config';
import { Settings } from '../../interfaces/interfaces';
import { SELECT_HAZARDOUS_SUBSTANCE_PAGE } from '../pages.constants';
import { HazardousSubstanceRepository, QRCodeProvider } from '../../providers/providers';
import { tap } from 'rxjs/operators';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NgxQRCodeComponent } from 'ngx-qrcode2';

/**
 * Generated class for the SingleHazardousSubstancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-single-hazardous-substance',
    templateUrl: 'single-hazardous-substance.html'
})
export class SingleHazardousSubstancePage {
    @ViewChild(NgxQRCodeComponent) qrcode: NgxQRCodeComponent;
    public hazardousSubstance: HazardousSubstance;
    public qrCodeValue: string;

    constructor(
        @Inject(APP_CONFIG) private appConfig: Settings,
        private alertController: AlertController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private hazardousSubstanceRepository: HazardousSubstanceRepository,
        private qrCodeProvider: QRCodeProvider,
        private documentViewer: DocumentViewer,
        private fileSystem: File,
        private sharer: SocialSharing
    ) {}

    public openSafetyDataSheet(): void {
        const path = `${this.fileSystem.applicationDirectory}www/assets/sds/`;
        const file = 'ACT143_2015-11-27.pdf';
        console.log('try open file', path + file);

        /**
         * Check if the file exists
         */
        // this.fileSystem
        //     .checkFile(path, file)
        //     .then(_ => console.log('Directory exists'))
        //     .catch(err => console.log(`Directory doesnt exist: ${path}${file}`));

        /**
         * open pdf with document viewer
         */
        this.documentViewer.viewDocument(path + file, 'application/pdf', {
            title: ` ${this.hazardousSubstance.name}`
        });
    }

    public exportQRCode(): void {
        this.qrcode
            .toDataURL()
            .then((qrDataUrl: string) => {
                console.log(qrDataUrl);
                this.sharer
                    .share(
                        `QR Code für ${this.hazardousSubstance.name}`,
                        `${this.hazardousSubstance.hsNumber}_qrcode`,
                        qrDataUrl
                    )
                    .then(v => {
                        console.log('Share', v);
                    })
                    .catch(this.informQRCodeExportError);
            })
            .catch(this.informQRCodeExportError);
    }

    private informQRCodeExportError = (e: Error): void => {
        this.alertController
            .create({
                title: 'Oops...',
                subTitle: 'QR Code Export klappt nicht',
                message: e.message,
                buttons: ['meh']
            })
            .present();
    };

    ionViewDidLoad() {
        console.log(
            `ionViewDidLoad SingleHazardousSubstancePage for ${this.hazardousSubstance.name}`
        );
        this.qrCodeValue = this.qrCodeProvider.getValueFor(this.hazardousSubstance);
        console.log(this.qrCodeValue);
    }

    ionViewCanEnter(): boolean | Promise<HazardousSubstance[]> {
        const hazardousSubstance = this.navParams.get('hazardousSubstance');
        if (!hazardousSubstance) {
            if (this.appConfig.debugMode) {
                return this.hazardousSubstanceRepository
                    .all()
                    .pipe(
                        tap(hazardousSubstances => {
                            this.hazardousSubstance = hazardousSubstances.shift();
                        })
                    )
                    .toPromise();
            }

            this.alertController
                .create({
                    title: 'Oops...',
                    subTitle: 'Bitte wählen Sie zuerst einen Gefahrstoff aus!',
                    buttons: [
                        {
                            text: 'Ok',
                            handler: () => {
                                this.navCtrl.push(SELECT_HAZARDOUS_SUBSTANCE_PAGE);
                            }
                        }
                    ]
                })
                .present();
            return false;
        }

        this.hazardousSubstance = hazardousSubstance;

        return true;
    }
}
