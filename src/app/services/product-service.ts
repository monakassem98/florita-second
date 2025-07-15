import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/floralProducts/';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.apiUrl);
  }

  selectOneProduct(productId: any): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}${productId}`);
  }

  getPlants(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.apiUrl)
      .pipe(
        map((products) =>
          products.filter((product) => product.category === 'plants')
        )
      );
  }

  getGifts(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.apiUrl)
      .pipe(
        map((products) =>
          products.filter((product) => product.category === 'gifts')
        )
      );
  }

  getRoses(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.apiUrl)
      .pipe(
        map((products) =>
          products.filter((product) => product.category === 'roses')
        )
      );
  }

  getFlowers(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.apiUrl)
      .pipe(
        map((products) =>
          products.filter((product) => product.category === 'flowers')
        )
      );
  }

  getTulips(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.apiUrl)
      .pipe(
        map((products) =>
          products.filter((product) => product.category === 'tulips')
        )
      );
  }
}
