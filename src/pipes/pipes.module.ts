import { NgModule } from '@angular/core';
import { HazardousSubstanceFilterPipe } from './hazardous-substance-filter/hazardous-substance-filter';
import { EntityListFilterPipe } from './entity-list-filter/entity-list-filter';
@NgModule({
    declarations: [HazardousSubstanceFilterPipe, EntityListFilterPipe],
    imports: [],
    exports: [HazardousSubstanceFilterPipe, EntityListFilterPipe]
})
export class PipesModule {}
