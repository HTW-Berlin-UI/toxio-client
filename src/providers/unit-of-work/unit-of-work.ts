import { Injectable } from '@angular/core';
import { NetworkProvider, DataExchangeProvider } from '../providers';
import { HazardousSubstanceRepository } from '../repositories/hazardous-substance-repository/hazardous-substance-repository';
import { MaterialRepository } from '../repositories/material-repository/material-repository';
import { ProcRepository } from '../repositories/proc-repository/proc-repository';
import { ProcedureRepository } from '../repositories/procedure-repository/procedure-repository';
import { ScopeRepository } from '../repositories/scope-repository/scope-repository';
import { PlantRepository } from '../repositories/plant-repository/plant-repository';
import { PurposeRepository } from '../repositories/purpose-repository/purpose-repository';
import { UsageRepository } from '../repositories/usage-repository/usage-repository';

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

    public sync(): Promise<string> {
        return new Promise((resolve, reject) => {
            console.log(this.network.isOnline);
            if (!this.network.isOnline) reject(new Error('Offline: Could not sync'));
            resolve('Syncing...');
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
