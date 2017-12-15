import { Pipe, PipeTransform } from '@angular/core';
import { HazardousSubstance } from '../../interfaces/interfaces';
import * as _ from 'lodash';

/**
 * Generated class for the HazardousSubstanceFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'hazardousSubstanceFilter'
})
export class HazardousSubstanceFilterPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    transform(hazardousSubstances: HazardousSubstance[], filter: string) {
        if (!filter) {
            return hazardousSubstances;
        }

        filter = filter.toLowerCase();

        return hazardousSubstances.filter(hazardousSubstance => {
            return _.some(
                [hazardousSubstance.name, hazardousSubstance.manufacturer],
                value => value.toLowerCase().indexOf(filter) !== -1
            );
        });
    }
}
