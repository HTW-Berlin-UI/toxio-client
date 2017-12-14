import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../../models/models';
import { HazardousSubstance } from '../../../interfaces/interfaces';
/*
  Generated class for the HazardousSubstanceRepositoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HazardousSubstanceRepository extends Repository<HazardousSubstance> {
    constructor(injector: Injector) {
        super('hazardous-substances', injector);
    }
}
