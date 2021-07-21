import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

  getAllReceipts(): Observable<any> {
    const url = `${this.apiUrl}/receipt/`;
    const params = new HttpParams().set('all', '1');
    return this.http.get(url, { params });
  }

  getSearchedReceipts(searchValue): Observable<any> {
    const url = `${this.apiUrl}/receipt/`;
    const params = new HttpParams().set('search', searchValue);
    return this.http.get(url, { params });
  }

  getCategories(): Observable<any> {
    const url = `${this.apiUrl}/categories/`;
    return this.http.get(url);
  }

  deleteCategory(categoryId): Observable<any> {
    const url = `${this.apiUrl}/categories/`;
    const formData = new FormData();
    formData.append('delete_category', categoryId);
    return this.http.post(url, formData);
  }

  createNewProduct(name, category, price, imageFile): Observable<any> {
    const formData = new FormData();

    formData.append('create_new_product', '1');
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('imageFile', imageFile, imageFile.name);

    return this.http.post(`${this.apiUrl}/`, formData);
  }

  updateProduct(id, availableAmount, name, category, price, imageFile): Observable<any> {
    const formData = new FormData();

    formData.append('edit_product', '1');
    formData.append('id', id);
    formData.append('productName', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('availableAmount', availableAmount);
    if (imageFile) {
      formData.append('imageFile', imageFile, imageFile.name);
    }

    return this.http.post(`${this.apiUrl}/`, formData);
  }


  buy(id: number, count: number) {

    return this.http.post(`${this.apiUrl}/buy/`, `number=${count}&productId=${id}`, httpOptions);
  }
}
