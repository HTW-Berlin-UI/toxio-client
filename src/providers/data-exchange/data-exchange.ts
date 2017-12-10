import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HazardousSubstance, Response } from '../../interfaces/_index';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataExchangeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataExchangeProvider {
  constructor(public http: HttpClient) {
    this.http
      .get<Response<HazardousSubstance[]>>(
        '/assets/data/hazardous-substances.json'
      )
      .map(response => response.data.hazardousSubstances)
      .do(response => {
        console.log(response);
      })
      .catch(this.handleError)
      .subscribe();
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${
        err.message
      }`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
}
