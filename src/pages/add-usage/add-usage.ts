import { Component, Inject } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    AlertController,
    ModalController
} from 'ionic-angular';
import { SELECT_HAZARDOUS_SUBSTANCE_PAGE, SELECT_ENTITY_MODAL_PAGE } from '../pages.constants';
import { HazardousSubstance, Settings, Plant } from '../../interfaces/interfaces';
import { tap } from 'rxjs/operators';
import { APP_CONFIG } from '../../app/app.config';
import { UnitOfWork } from '../../providers/providers';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the AddUsagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-usage',
    templateUrl: 'add-usage.html'
})
export class AddUsagePage {
    public hazardousSubstance: HazardousSubstance;
    public usage: {
        plants: Plant[];
    };

    constructor(
        @Inject(APP_CONFIG) private appConfig: Settings,
        public navController: NavController,
        public navParams: NavParams,
        private alertController: AlertController,
        private modalController: ModalController,
        private unitOfWork: UnitOfWork
    ) {}

    public openSelectModal<T>(label: string, entities: Observable<T[]>) {
        const selectModal = this.modalController.create(SELECT_ENTITY_MODAL_PAGE, {
            label: label,
            entities: entities
        });
        selectModal.onDidDismiss((response?: any) => {
            if (response) this.usage.plants = response;
        });
        selectModal.present();
    }

    public get plants(): Observable<Plant[]> {
        return this.unitOfWork.plantRepository.all();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddUsagePage');
        this.usage = {
            plants: null
        };
    }

    ionViewCanEnter(): boolean | Promise<HazardousSubstance[]> {
        const hazardousSubstance = this.navParams.get('hazardousSubstance');
        if (!hazardousSubstance) {
            if (this.appConfig.debugMode) {
                return this.unitOfWork.hazardousSubstanceRepository
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
                                this.navController.push(SELECT_HAZARDOUS_SUBSTANCE_PAGE);
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
