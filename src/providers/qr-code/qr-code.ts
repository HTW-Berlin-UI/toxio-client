import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG } from '../../app/app.config';
import { Settings, HazardousSubstance } from '../../interfaces/interfaces';

/*
  Generated class for the QrCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrCodeProvider {
    constructor(@Inject(APP_CONFIG) private appConfig: Settings) {}

    public getValueFor(hazardousSubstance: HazardousSubstance): string {
        const parts = [
            this.appConfig.current.organization.id,
            this.appConfig.current.unit.id,
            hazardousSubstance.hsNumber,
            hazardousSubstance.id
        ];

        return `${parts[0]}-${parts[1]}-${parts[2]}-${parts[3]}`;
    }
}
