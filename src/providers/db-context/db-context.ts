import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Syncable } from '../../interfaces/interfaces';

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

    public save(key: string, value: Syncable[]): void {
        this.storage.set(key, value);
        console.log(`${key} saved to local db`);
    }

    public load<T>(key: string): Promise<T> {
        return this.storage.get(key);
    }
}
