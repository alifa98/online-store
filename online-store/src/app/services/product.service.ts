import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/api/product';

  constructor(private http: HttpClient) { }

  getReceipts(): Observable<any> {
    const url = `${this.apiUrl}/receipt/`;
    return this.http.get(url);
  }

}
