import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import {
    RawHazardousSubstance,
    HazardousSubstance,
    Response,
    UsageResources,
    Settings,
    Usage,
    RawUsage
} from '../../interfaces/interfaces';
import { APP_CONFIG } from '../../app/app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, tap, map } from 'rxjs/operators';

/*
  Generated class for the DataExchangeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataExchangeProvider {
    private emkgStringValues = ['LOW', 'MIDDLE', 'HIGH', 'VERY_HIGH'];

    private endpoints = {
        hazardousSubstances: '/hazardsubstances',
        usageResources: `/usages/resources/${this.appConfig.current.organization.id}/${
            this.appConfig.current.unit.id
        }`,
        usages: '/usages'
    };

    constructor(@Inject(APP_CONFIG) private appConfig: Settings, public http: HttpClient) {
        console.log('DataExchangeProvider initiated');
    }

    public getHazardousSubstancesFromAssets(): Observable<HazardousSubstance[]> {
        return this.http
            .get<Response<HazardousSubstance[]>>('./assets/data/hazardous-substances.json')
            .pipe(
                tap(console.log),
                map(response => response.data.hazardousSubstances),
                catchError(this.handleError)
            );
    }

    public getHazardousSubstances(): Observable<HazardousSubstance[]> {
        return this.http
            .get<HazardousSubstance[]>(this.appConfig.apiUrl + this.endpoints.hazardousSubstances)
            .pipe(tap(console.log), map(this.mapHazardousSubstances), catchError(this.handleError));
    }

    private mapHazardousSubstances(response: RawHazardousSubstance[]): HazardousSubstance[] {
        return response.map(rawHazardousSubstance => {
            return {
                id: rawHazardousSubstance.hs_id,
                hsNumber: rawHazardousSubstance.hs_number,
                name: rawHazardousSubstance.substance_name,
                manufacturer: `Hersteller ${rawHazardousSubstance.substance_name}`,
                active: !!rawHazardousSubstance.active,
                approved: !!rawHazardousSubstance.approved,
                substanceCAS: rawHazardousSubstance.substance_cas,
                substanceEG: rawHazardousSubstance.substance_eg,
                substanceID: rawHazardousSubstance.substance_id,
                created: '',
                updated: ''
            };
        });
    }

    private mapUsage(usage: Usage): RawUsage {
        return {
            excrete: this.emkgStringValues[usage.emkgInhalation.release],
            surface: this.emkgStringValues[usage.emkgSkin.area],
            scope_id: usage.scope.id,
            org_id: this.appConfig.current.organization.id,
            air_supply: this.emkgStringValues[usage.emkgFire.airSupply],
            qty: this.emkgStringValues[usage.emkgInhalation.quantity],
            proc_id: usage.proc.id,
            procedure_id: usage.procedure.id,
            closed_system: usage.emkgFire.closedSystem ? 'YES' : 'NO',
            dusting: this.emkgStringValues[usage.emkgFire.release],
            frequency: this.emkgStringValues[usage.emkgFire.quantity],
            purpose_id: usage.purpose.id,
            plant_ids: usage.plants.map(usagePlant => usagePlant.plant.id),
            duration: this.emkgStringValues[usage.emkgSkin.duration],
            flammable: usage.emkgFire.flammable ? 'YES' : 'NO',
            hs_id: usage.hazardousSubstance.id,
            material_id: usage.material.id,
            active: 1
        };
    }

    public postUsage(usage: Usage): Observable<string> {
        // Test requests https://httpbin.org/post

        return this.http
            .post(this.appConfig.apiUrl + this.endpoints.usages, this.mapUsage(usage))
            .pipe(tap(console.log), catchError(this.handlePostError));
    }

    public getUsageResourcesFromAssets(): Observable<UsageResources> {
        return this.http
            .get<Response<UsageResources>>('./assets/data/usage-resources.json')
            .pipe(tap(console.log), map(response => response.data), catchError(this.handleError));
    }

    public getUsageResources(): Observable<UsageResources> {
        return this.http
            .get<Response<UsageResources>>(this.appConfig.apiUrl + this.endpoints.usageResources)
            .pipe(tap(console.log), catchError(this.handleError));
    }

    private handlePostError(err: HttpErrorResponse): Observable<String> {
        console.warn(err);
        return Observable.of(err.message);
    }

    private handleError(err: HttpErrorResponse): ErrorObservable {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}, body was: ${JSON.stringify(
                err.error
            )}`;
        }
        console.warn(err);
        return new ErrorObservable(errorMessage);
    }
}
