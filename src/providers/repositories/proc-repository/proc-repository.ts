import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../../models/models';
import { Proc } from '../../../interfaces/interfaces';
/*
  Generated class for the ProcRepositoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProcRepository extends Repository<Proc> {
    constructor(injector: Injector) {
        super('Proc', injector);
    }
}
