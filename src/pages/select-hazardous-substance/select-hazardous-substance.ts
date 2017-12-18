import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HazardousSubstanceRepository } from '../../providers/providers';
import { HazardousSubstance } from '../../interfaces/interfaces';
import { Observable } from 'rxjs/Observable';
import { SINGLE_HAZARDOUS_SUBSTANCE_PAGE } from '../pages.constants';

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

    // public get hazardousSubstances(): Observable<HazardousSubstance[]> {
    //     return this.hazardousSubstancesRepository.all();
    // }

    constructor(
        public navCtrl: NavController,
        private hazardousSubstancesRepository: HazardousSubstanceRepository
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad SelectHazardousSubstancePage');
        this.hazardousSubstances = this.hazardousSubstancesRepository.all();
    }

    search(event: Event): void {
        this.textFilter = (<HTMLInputElement>event.target).value;
    }

    select(hazardousSubstance: HazardousSubstance): void {
        this.navCtrl.push(SINGLE_HAZARDOUS_SUBSTANCE_PAGE, {
            hazardousSubstance: hazardousSubstance
        });
    }
}
