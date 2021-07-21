import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductFiltering } from '../interface/ProductFiltering';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductLoaderService {

  private apiUrl = '/api/product';
  private productSubject: Subject<any> = new Subject();

  public productPerPage: number = 10;
  public currentPage: number = 1;
  public count: number;

  private productFilter: ProductFiltering;

  constructor(private http: HttpClient) {

    this.productFilter = {
      name: '',
      categories: null,
      maxPrice: null,
      perPage: this.productPerPage,
      currentPage: this.currentPage,
      sortBy: null
    }

  }


  onProductFilteringChange(): Observable<any> {
    return this.productSubject.asObservable();
  }

  get_products(filtering: ProductFiltering): Observable<any> {
    const formData = new FormData();
    formData.append('name', filtering.name);
    if (filtering.categories != null) {
      formData.append('category', filtering.categories.toString());
    }
    if (filtering.maxPrice != null) {
      formData.append('maxPrice', filtering.maxPrice.toString());
    }
    formData.append('perPage', filtering.perPage.toString());
    formData.append('currentPage', filtering.currentPage.toString());
    if (filtering.sortBy != null) {
      formData.append('sortBy', filtering.sortBy);
    }
    return this.http.post(`${this.apiUrl}/list/`, formData);
  }



  loadProducts(): void {
    this.get_products(this.productFilter).subscribe(
      result => {
        this.count = result[0].count;
        this.productSubject.next(result);
      },
      error => console.log(error)
    );
  }

  updateProductsPageInFiltering(page: number): void {
    this.currentPage = page;
    this.productFilter.currentPage = page;
  }

  updateProductsSortByInFiltering(sortType: string): void {
    this.productFilter.sortBy = sortType;
  }

  updateProductsMaxPricenFiltering(price: number): void {
    this.productFilter.maxPrice = price;
  }

  updateProductsSerarchTextInFiltering(txt: string): void {
    this.productFilter.name = txt;
  }

  updateProductsCategoresInFiltering(ids: number[]): void {
    this.productFilter.categories = ids;
  }


}
