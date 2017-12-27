import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../../models/models';
import { Material } from '../../../interfaces/interfaces';
/*
  Generated class for the MaterialRepositoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MaterialRepository extends Repository<Material> {
    constructor(injector: Injector) {
        super('Material', injector);
    }
}
