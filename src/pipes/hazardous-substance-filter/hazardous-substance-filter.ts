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
     * Filter Hazardous Substances by string
     * @param hazardousSubstances
     * @param filter
     */
    transform(hazardousSubstances: HazardousSubstance[], filter: string) {
        if (!filter) {
            return hazardousSubstances;
        }

        filter = filter.toLowerCase();

        return hazardousSubstances.filter(hazardousSubstance => {
            return _.some(
                [
                    hazardousSubstance.name,
                    hazardousSubstance.manufacturer,
                    hazardousSubstance.substanceCAS,
                    hazardousSubstance.substanceEG
                ],
                value => value.toLowerCase().indexOf(filter) !== -1
            );
        });
    }
}
