import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/';

  constructor(private http: HttpClient) { }

  isAuthenticated(): Observable<any> {
    const url = `${this.apiUrl}login/`;
    const params = new HttpParams().set('is_authenticated', '1');

    return this.http.get(url, {params});
  }
  login(username, password): Observable<any> {
    const url = `${this.apiUrl}login/`;
    const body = `login=1&username=${username}&password=${password}`;

    return this.http.post(url, body, httpOptions);
  }

  logout(): Observable<any> {
    const url = `${this.apiUrl}login/`;
    const body = `logout=1`;

    return this.http.post(url, body, httpOptions);
  }
}
