import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG } from '../../app/app.config';
import { Settings, HazardousSubstance } from '../../interfaces/interfaces';
import { HazardousSubstanceRepository } from '../repositories/hazardous-substance-repository';

/*
  Generated class for the QrCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QRCodeProvider {
    private hazardousSubstances: HazardousSubstance[];
    private separator: string = '-';
    private hsNumberIndex: number = 2;
    private prefix: string = 'toxio://open?';

    constructor(
        @Inject(APP_CONFIG) private appConfig: Settings,
        private hazardousSubstanceRepository: HazardousSubstanceRepository
    ) {
        this.hazardousSubstanceRepository.all().subscribe(hazardousSubstances => {
            this.hazardousSubstances = hazardousSubstances;
        });
    }

    public getValueFor(hazardousSubstance: HazardousSubstance): string {
        const parts = [
            this.appConfig.current.organization.id,
            this.appConfig.current.unit.id,
            hazardousSubstance.hsNumber,
            hazardousSubstance.id
        ];
        const sep = this.separator;

        return `${this.prefix}${parts[0]}${sep}${parts[1]}${sep}${parts[2]}${sep}${parts[3]}`;
    }

    getHazardousSubstanceFor(qrToken: string): false | HazardousSubstance {
        if (!this.hazardousSubstances) return false;

        if (!qrToken.startsWith(this.prefix)) return false;
        qrToken.replace(this.prefix, '');

        const attributes = qrToken.split(this.separator);

        if (!(this.hsNumberIndex in attributes)) return false;

        const searchForHsNumber = attributes[this.hsNumberIndex];

        return this.hazardousSubstances.find(
            hazardousSubstance => hazardousSubstance.hsNumber === searchForHsNumber
        );
    }
}
