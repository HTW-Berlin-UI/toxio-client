import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HazardousSubstance } from '../../interfaces/interfaces';
import { APP_CONFIG } from '../../app/app.config';
import { SELECT_HAZARDOUS_SUBSTANCE_PAGE } from '../pages.constants';
import { Settings } from '../../interfaces/interfaces';
import { HazardousSubstanceRepository, QrCodeProvider } from '../../providers/providers';
import { tap } from 'rxjs/operators';

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
    public hazardousSubstance: HazardousSubstance;
    public qrCodeValue: string;

    constructor(
        @Inject(APP_CONFIG) private appConfig: Settings,
        private alertCtrl: AlertController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private hazardousSubstanceRepository: HazardousSubstanceRepository,
        private qrCodeProvider: QrCodeProvider
    ) {}

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

            this.alertCtrl
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
