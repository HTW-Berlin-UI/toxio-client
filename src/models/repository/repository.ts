import { Injector } from '@angular/core';
import { Syncable } from '../../interfaces/interfaces';
import { DbContext } from '../../providers/providers';

export class Repository<TEntity extends Syncable> {
    private dbContext: DbContext;

    constructor(public identifier: string, injector: Injector) {
        this.dbContext = injector.get(DbContext);
    }

    public save(...elements: TEntity[]): void {
        this.dbContext.save(this.identifier, elements);
    }
}
