import {
    HazardousSubstance,
    Plant,
    Proc,
    Procedure,
    Scope,
    Material,
    Purpose,
    Syncable
} from '../interfaces';

interface UsagePlant {
    plant: Plant;
    amount: number;
    unit: string;
}

export interface Usage extends Syncable {
    hazardousSubstance: HazardousSubstance;
    plants: UsagePlant[];
    procedure: Procedure;
    scope: Scope;
    Purpose: Purpose;
    Material: Material;
    Proc: Proc;
    emkgSkin: {
        area: number;
        duration: number;
    };
    emkgInhalation: {
        quantity: number;
        release: number;
    };
    emkgFire: {
        quantity: number;
        release: number;
    };
}
