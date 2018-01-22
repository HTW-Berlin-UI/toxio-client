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
    purpose: Purpose;
    material: Material;
    proc: Proc;
    emkgSkin: {
        area: number;
        duration: number;
    };
    emkgInhalation: {
        quantity: number;
        release: number;
    };
    emkgFire: {
        airSupply: number;
        quantity: number;
        release: number;
        closedSystem: boolean;
        flammable: boolean;
    };
}

export interface RawUsage {
    excrete: string;
    surface: string;
    scope_id: number;
    org_id: number;
    air_supply: string;
    qty: string;
    proc_id: number;
    procedure_id: number;
    closed_system: string;
    dusting: string;
    frequency: string;
    purpose_id: number;
    plant_ids: Array<number>;
    duration: string;
    flammable: string;
    hs_id: number;
    material_id: number;
    active: number;
}
