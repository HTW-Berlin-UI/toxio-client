import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../models/models';
import { Usage } from '../../interfaces/interfaces';
/*
  Generated class for the ScopeRepositoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsageRepository extends Repository<Usage> {
    constructor(injector: Injector) {
        super('Usage', injector);
    }
}
