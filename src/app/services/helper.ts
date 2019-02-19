import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';


export const handleErrorObservable = function <T>(operation = 'operation', result?: T) {
    // if (error.error instanceof ErrorEvent) {
    //     console.error('Error sending a request", error.error.message');
    // } else {
    //     console.log('error', error);
    //     console.error(
    //         `Backend returned code ${error.status}, ` +
    //         `body was: ${error.error}`);
    // }
    // return throwError(
    //     'Something bad happened; please try again later.');
    return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
};
