import { Syncable } from './_index';

export interface HazardousSubstance extends Syncable {
    id: number;
    hsNumber: string;
    name: string;
    manufacturer: string;
    active: boolean;
    approved: boolean;
    symbols: string[];
    hPhrases: string[];
    pPhrases: string[];
}
