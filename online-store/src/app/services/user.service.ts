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
  private apiUrl = '/api/user/';
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
      this.updateIsLoggedIn();
  }

  updateIsLoggedIn(): void {
    const url = `${this.apiUrl}login/`;
    const params = new HttpParams().set('is_authenticated', '1');

    this.http.get(url, {params}).subscribe(res => {
        this.isLoggedIn = res['is_authenticated'];
    });
  }

  login(username, password): Observable<any> {
    const url = `${this.apiUrl}login/`;
    const body = `login=1&username=${username}&password=${password}`;

    return this.http.post(url, body, httpOptions);
  }

  getUserInfo(): Observable<any> {
    const url = `${this.apiUrl}info/`;
    return this.http.get(url);
  }

  updateUserInfo(firstName, lastName, password, address): Observable<any> {
    const url = `${this.apiUrl}info/`;
    const body = `first_name=${firstName}&last_name=${lastName}&password=${password}&address=${address}`;
    return this.http.put(url, body, httpOptions);
  }

  signup(username, password, firstName, lastName, address): Observable<any> {
    const url = `${this.apiUrl}signup/`;
    const body = `signup=1&username=${username}&password=${password}&first_name=${firstName}&last_name=${lastName}
                  &address=${address}`;


    return this.http.post(url, body, httpOptions);
  }

  logout(): Observable<any> {
    const url = `${this.apiUrl}login/`;
    const body = `logout=1`;

    return this.http.post(url, body, httpOptions);
  }

  increaseCredit(): Observable<any> {
    const url = `${this.apiUrl}info/`;
    const body = 'increase_credit=1';

    return this.http.post(url, body, httpOptions);
  }
}
