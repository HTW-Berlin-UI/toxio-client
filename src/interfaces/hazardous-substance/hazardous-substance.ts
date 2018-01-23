import { Syncable } from '../interfaces';

export interface RawHazardousSubstance {
    manufacturer_id: number;
    active: number;
    hs_number: string;
    hs_id: number;
    substance_eg: string;
    approved: number;
    substance_formula: string;
    substance_cas: string;
    substance_id: number;
    substance_name: string;
}

export interface HazardousSubstance extends Syncable {
    id: number;
    hsNumber: string;
    name: string;
    manufacturer: string;
    active: boolean;
    approved: boolean;
    substanceCAS: string;
    substanceEG: string;
    substanceID: number;
}
