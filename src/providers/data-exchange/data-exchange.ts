import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HazardousSubstance, Response } from '../../interfaces/interfaces';
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
    constructor(public http: HttpClient) {
        console.log('DataExchangeProvider initiated');
    }

    getHazardousSubstances(): Observable<HazardousSubstance[]> {
        return this.http
            .get<Response<HazardousSubstance[]>>('./assets/data/hazardous-substances.json')
            .pipe(
                tap(console.log),
                map(response => response.data.hazardousSubstances),
                catchError(this.handleError)
            );
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
