import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import {
    RawHazardousSubstance,
    HazardousSubstance,
    Response,
    UsageResources,
    Settings
} from '../../interfaces/interfaces';
import { APP_CONFIG } from '../../app/app.config';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, tap, map } from 'rxjs/operators';

/*
  Generated class for the DataExchangeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataExchangeProvider {
    private endpoints = {
        hazardousSubstances: '/hazardsubstances'
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
                id: rawHazardousSubstance.substance_id,
                hsNumber: rawHazardousSubstance.hs_number,
                name: rawHazardousSubstance.substance_name,
                manufacturer: rawHazardousSubstance.manufacturer_id.toString(),
                active: !!rawHazardousSubstance.active,
                approved: !!rawHazardousSubstance.approved,
                substanceCAS: rawHazardousSubstance.substance_cas,
                substanceEG: rawHazardousSubstance.substance_eg,
                created: '',
                updated: ''
            };
        });
    }

    public getUsageResources(): Observable<UsageResources> {
        return this.http
            .get<Response<UsageResources>>('./assets/data/usage-resources.json')
            .pipe(tap(console.log), map(response => response.data), catchError(this.handleError));
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
            errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        console.error(err);
        return new ErrorObservable(errorMessage);
    }
}
