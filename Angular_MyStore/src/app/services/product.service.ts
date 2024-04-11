import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Product } from '../product';
import { PRODUCTS } from '../mock-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsURL = 'assets/productsData.json';

  storage = window.localStorage;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsURL);
  }

  /** GET hero by id. Will 404 if id not found */
  getProductById(id: number): Observable<Product> {
    const url = `${this.productsURL}/${id}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError<Product>(`getProductById id=${id}`))
    );
  }

  addProduct(product: Product[]) {
    this.storage.setItem('products', JSON.stringify(product));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
