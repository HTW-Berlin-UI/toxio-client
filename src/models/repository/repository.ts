import { Injectable } from '@angular/core';
import { Syncable } from '../../interfaces/interfaces';
import { StorageProvider } from '../../providers/providers';

@Injectable()
export class Repository<TEntity extends Syncable> {
    constructor(public identifier: string, private storage: StorageProvider) {
        console.log(`i am a ${this.identifier} provider`);
    }
}
