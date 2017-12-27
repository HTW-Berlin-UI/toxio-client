import { Syncable } from '../interfaces';
export interface Plant extends Syncable {
    abbr: string;
    name: string;
    id: number;
}
