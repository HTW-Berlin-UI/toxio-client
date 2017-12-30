import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../models/models';
import { Purpose } from '../../interfaces/interfaces';
/*
  Generated class for the PurposeRepositoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PurposeRepository extends Repository<Purpose> {
    constructor(injector: Injector) {
        super('Purpose', injector);
    }
}
