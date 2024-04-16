import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  dotnetBaseURL = 'https://localhost:5001/api/';
  nodeBaseURL = 'http://localhost:3000/api/';

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.dotnetBaseURL + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user)
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  };

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  nodeAPICalling() {
    return this.http.get(this.nodeBaseURL + 'courses').pipe(
      catchError(this.handleError)
    );
  }

  dotnetAPICalling() {
    return this.http.get(this.dotnetBaseURL + 'users').pipe(
      catchError(this.handleError)
    );
  }

  dotnetAPIWeather() {
    return this.http.get(this.dotnetBaseURL + 'weatherforecast').pipe(
      catchError(this.handleError)
    );
  }

  getpdateID(id: string) {
    return this.http.get(this.nodeBaseURL + 'courses/' + id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  register(model: any) {
    return this.http.post<User>(this.dotnetBaseURL + 'account/register', model).pipe(map(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
      }
     // not needing the info
     // return user;
    }))
  }

}
