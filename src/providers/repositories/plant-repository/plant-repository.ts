import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../../models/models';
import { Plant } from '../../../interfaces/interfaces';
/*
  Generated class for the PlantRepositoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlantRepository extends Repository<Plant> {
    constructor(injector: Injector) {
        super('Plant', injector);
    }
}
