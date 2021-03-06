import { Injectable } from '@angular/core';
import { NetworkProvider, DataExchangeProvider } from '../providers';
import { HazardousSubstanceRepository } from '../repositories/hazardous-substance-repository';
import { MaterialRepository } from '../repositories/material-repository';
import { ProcRepository } from '../repositories/proc-repository';
import { ProcedureRepository } from '../repositories/procedure-repository';
import { ScopeRepository } from '../repositories/scope-repository';
import { PlantRepository } from '../repositories/plant-repository';
import { PurposeRepository } from '../repositories/purpose-repository';
import { UsageRepository } from '../repositories/usage-repository';

import { Usage } from '../../interfaces/interfaces';

/*
  Generated class for the UnitOfWorkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UnitOfWork {
    constructor(
        private network: NetworkProvider,
        private dataExchange: DataExchangeProvider,
        public hazardousSubstanceRepository: HazardousSubstanceRepository,
        public materialRepository: MaterialRepository,
        public procRepository: ProcRepository,
        public procedureRepository: ProcedureRepository,
        public scopeRepository: ScopeRepository,
        public plantRepository: PlantRepository,
        public purposeRepository: PurposeRepository,
        public usageRepository: UsageRepository
    ) {
        console.log('UnitOfWork initiated');
    }

    public init(): void {
        if (this.network.isOnline) {
            this.updateData();
        }
    }

    public sync(usage: Usage): Promise<string> {
        return new Promise((resolve, reject) => {
            console.log(this.network.isOnline);
            if (!this.network.isOnline)
                resolve(
                    'Sie sind offline. Die Anwendung wird synchronisiert sobald Sie eine Verbindung mit dem Internet herstellen.'
                );
            this.dataExchange.postUsage(usage).subscribe(response => {
                resolve(response ? response : '...und erfolgreich synchronisiert.');
            });
        });
    }

    private updateData(): void {
        this.dataExchange.getHazardousSubstances().subscribe(hazardousSubstances => {
            this.hazardousSubstanceRepository.save(...hazardousSubstances);
        });
        this.dataExchange.getUsageResources().subscribe(usageResources => {
            this.materialRepository.save(...usageResources.materials);
            this.procRepository.save(...usageResources.procs);
            this.procedureRepository.save(...usageResources.procedures);
            this.scopeRepository.save(...usageResources.scopes);
            this.plantRepository.save(...usageResources.plants);
            this.purposeRepository.save(...usageResources.purposes);
        });
    }
}
