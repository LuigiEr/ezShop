import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IProduct, IProductData } from '../models/product.interface';
import { ToastrService } from 'ngx-toastr';
import { IStore } from '../models/store.interface';
import { IStatsCategories } from '../models/stats-categories.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrlStore = `${environment.baseApiUrl}/${environment.storeId}`;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getStore(): Observable<IStore> {
    return this.http.get<IStore>(`${this.apiUrlStore}`).pipe(
      catchError((error: HttpErrorResponse) => {
        throw this.handleError(error, 'Error while retrieving the stores');
      }));
  }

  getStatsCategories() {
    return this.http.get<IStatsCategories[]>(`${this.apiUrlStore}/stats/categories`).pipe(
      catchError((error: HttpErrorResponse) => {
        throw this.handleError(error, 'Error while retrieving the stats categories');
      }));
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrlStore}/products`).pipe(
      map((response: IProduct[]) => {
        return response
      }),
      catchError((error: HttpErrorResponse) => {
        throw this.handleError(error, 'Error while retrieving the products');
      }));
  }

  saveProductData(productData: IProductData): Observable<string> {
    var HTTPOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*'
      }),
      'responseType': 'text' as 'json'
    }

    return this.http.post<string>(`${this.apiUrlStore}/products`, productData, HTTPOptions).pipe(
      map((idCreated: string) => {
        this.toastr.success(`Product created with id: ${idCreated}`);
        return idCreated
      }),
      catchError((error: HttpErrorResponse) => {
        throw this.handleError(error, 'Error while retrieving the products');
      }));
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrlStore}/products/${id}`).pipe(
      tap(() => this.toastr.success(`Product deleted`)),
      catchError((error: HttpErrorResponse) => {
        throw this.handleError(error, 'Error while deleting the product');
      }));
  }

  private handleError(error: HttpErrorResponse, message: string) {
    this.toastr.error(message);
    return message;
  }
}
