import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = environment.apiBaseUrl;

  constructor(public http: HttpClient) { }

  login(data: any): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/user/login`;
      return this.http.post(apiUrl, data);
    } catch (error) {
      console.log(error.message);
    }
  }

  public signUp(data: any): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/user/signup`;
      return this.http.post(apiUrl, data);
    } catch (error) {
      console.log(error.message);
    }
  }

  public signOut(): void {
    localStorage.removeItem('token');
  }

  public getUser(): Observable<User> {
    return of({
      name: 'John',
      lastName: 'Smith'
    });
  }
}
