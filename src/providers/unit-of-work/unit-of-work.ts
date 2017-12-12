import { Injectable } from '@angular/core';
import { NetworkProvider } from '../providers';

/*
  Generated class for the UnitOfWorkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UnitOfWork {
    constructor(private network: NetworkProvider) {
        console.log('Hello UnitOfWorkProvider Provider');
    }
}
