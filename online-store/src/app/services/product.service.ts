import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};

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

  getCategories(): Observable<any> {
    const url = `${this.apiUrl}/categories/`;
    return this.http.get(url);
  }

  createNewProduct(name, category, price, imageFile): Observable<any> {
    const formData = new FormData();
    console.log(imageFile);
    formData.append('create_new_product', '1');
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('imageFile', imageFile, imageFile.name);

    return this.http.post(`${this.apiUrl}/`, formData);
  }

}
