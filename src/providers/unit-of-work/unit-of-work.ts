import { Injectable } from '@angular/core';
import { NetworkProvider, DataExchangeProvider } from '../providers';
import { HazardousSubstanceRepository } from '../repositories/hazardous-substance-repository/hazardous-substance-repository';

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
        public hazardousSubstanceRepository: HazardousSubstanceRepository
    ) {
        console.log('UnitOfWork initiated');
    }

    public init(): void {
        if (this.network.isOnline) {
            this.updateData();
        }
    }

    private updateData(): void {
        this.dataExchange.getHazardousSubstances().subscribe(hazardousSubstances => {
            this.hazardousSubstanceRepository.save(...hazardousSubstances);
        });
    }
}
