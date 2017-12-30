import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../models/models';
import { Procedure } from '../../interfaces/interfaces';
/*
  Generated class for the ProcedureRepositoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProcedureRepository extends Repository<Procedure> {
    constructor(injector: Injector) {
        super('Procedure', injector);
    }
}
