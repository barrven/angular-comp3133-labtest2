import { Injectable } from '@angular/core';
import { Launch } from '../models/launch';

// Angular's HttpClient methods return RxJS Observables
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {

  private launchesUrl = 'https://api.spacexdata.com/v3/launches';  // URL to web api

  constructor(private http: HttpClient) { }


  //Get launches from the server
  getLaunches(): Observable<Launch[]> {

    return this.http.get<Launch[]>(this.launchesUrl)
      .pipe(
        tap(() => console.log('fetched launches')),
        catchError(this.handleError<Launch[]>('getlaunches', []))
      );

  }

  // Get launch by id
  getLaunch(id: number): Observable<Launch> {
    const url = `${this.launchesUrl}/${id}`;
    return this.http.get<Launch>(url).pipe(
      tap(_ => console.log(`fetched launch id=${id}`)),
      catchError(this.handleError<Launch>(`getlaunch id=${id}`))
    );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
