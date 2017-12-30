import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the DbContext provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbContext {
    constructor(private storage: Storage) {
        console.log('DbContext initiated');
    }

    public save<T>(key: string, value: T): Promise<T> {
        console.log(`${key} saved to local db`);
        return this.storage.set(key, value);
    }

    public load<T>(key: string): Promise<T> {
        return this.storage.get(key);
    }
}
