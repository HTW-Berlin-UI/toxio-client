import { Syncable } from '../interfaces';
export interface Proc extends Syncable {
    description: string;
    id: number;
    proc: string;
}
