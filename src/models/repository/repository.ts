import { Injector } from '@angular/core';
import { Syncable } from '../../interfaces/interfaces';
import { DbContext } from '../../providers/providers';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

export class Repository<TEntity extends Syncable> {
    private dbContext: DbContext;

    constructor(public identifier: string, injector: Injector) {
        this.dbContext = injector.get(DbContext);
        console.log(`Repository for ${identifier} initiated`);
    }

    public save(...elements: TEntity[]): Promise<TEntity[]> {
        return this.dbContext.save(this.identifier, elements);
    }

    public all(): Observable<TEntity[]> {
        return fromPromise<TEntity[]>(this.dbContext.load(this.identifier));
    }
}
