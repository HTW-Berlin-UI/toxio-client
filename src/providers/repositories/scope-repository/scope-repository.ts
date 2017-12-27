import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../../models/models';
import { Scope } from '../../../interfaces/interfaces';
/*
  Generated class for the ScopeRepositoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScopeRepository extends Repository<Scope> {
    constructor(injector: Injector) {
        super('Scope', injector);
    }
}
