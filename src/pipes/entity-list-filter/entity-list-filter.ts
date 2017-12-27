import { Pipe, PipeTransform } from '@angular/core';
import { UsageResourceEntity } from '../../interfaces/interfaces';
import * as _ from 'lodash';

/**
 * Generated class for the EntityListFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'entityListFilter'
})
export class EntityListFilterPipe implements PipeTransform {
    /**
     * transform entity list by filterString
     */
    transform(entities: UsageResourceEntity[], filter: string) {
        if (!filter) {
            return entities;
        }

        filter = filter.toLowerCase();

        return entities.filter(entity => {
            const scope = [];
            if (entity.name) scope.push(entity.name);
            if (entity.description) scope.push(entity.description);
            if (entity.area) scope.push(entity.area);
            return _.some(scope, value => value.toLowerCase().indexOf(filter) !== -1);
        });
    }
}
