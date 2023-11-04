import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private baseApiUrl = 'https://us-central1-test-b7665.cloudfunctions.net/api/stores';
  private storeId = 'ijpxNJLM732vm8AeajMR';
  private apiUrlStore = `${this.baseApiUrl}/${this.storeId}`;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(`${this.apiUrlStore}/products`).pipe(
      map((response: Product[]) => {
        return response
      }),
      catchError(error => {
        throw this.handleError(error, 'Error while retrieving the products');
      })
    )
  }

  private handleError(error: HttpErrorResponse, message: string) {
    console.error(error);
    this.toastr.error(message);
    return message;
  }
}
