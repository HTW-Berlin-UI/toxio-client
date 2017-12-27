import { Material, Proc, Scope, Procedure, Plant, Purpose } from '../interfaces';
export interface UsageResources {
    materials: Material[];
    procs: Proc[];
    scopes: Scope[];
    procedures: Procedure[];
    plants: Plant[];
    purposes: Purpose[];
}
