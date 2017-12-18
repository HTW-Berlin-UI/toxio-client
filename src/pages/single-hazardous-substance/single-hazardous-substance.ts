import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HazardousSubstance } from '../../interfaces/interfaces';
import { APP_CONFIG } from '../../app/app.config';
import { SELECT_HAZARDOUS_SUBSTANCE_PAGE } from '../pages.constants';
import { Settings } from '../../interfaces/interfaces';
import { HazardousSubstanceRepository } from '../../providers/providers';
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
    private hazardousSubstance: HazardousSubstance;

    constructor(
        @Inject(APP_CONFIG) private appConfig: Settings,
        private alertCtrl: AlertController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private hazardousSubstanceRepository: HazardousSubstanceRepository
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad SingleHazardousSubstancePage');
    }

    ionViewCanEnter(): boolean {
        const hazardousSubstance = this.navParams.get('hazardousSubstance');
        if (!hazardousSubstance) {
            if (this.appConfig.debugMode) {
                this.hazardousSubstanceRepository.all().pipe(tap(console.log));
                return true;
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
