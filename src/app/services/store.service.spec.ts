import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StoreService } from './store.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MockStore } from 'src/test-mocks/store.mock';
import { IStore } from '../models/store.interface';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MockStatsCategoriesList } from 'src/test-mocks/stats-category.mock';
import { IStatsCategories } from '../models/stats-categories.interface';
import { IProduct } from '../models/product.interface';
import { MockProductList } from 'src/test-mocks/product.mock';
import { MockProductDataList } from 'src/test-mocks/product-data.mock';

describe('StoreService', () => {
  let service: StoreService;
  let httpTestingController: HttpTestingController;
  let toastr: ToastrService;
  const apiUrlStore = `${environment.baseApiUrl}/${environment.storeId}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [ToastrService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StoreService);
    toastr = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getStore', () => {
    it('should call the API and return the data', () => {
      var mockStore = MockStore;

      service.getStore().subscribe((data: IStore) => {
        expect(data).toEqual(mockStore);
      });

      const request = httpTestingController.expectOne(apiUrlStore);
      request.flush(mockStore);

      expect(request.request.method).toBe('GET');
    });

    it('should catch the Error and show the error message', () => {
      var mockStore = MockStore;

      const error = new HttpErrorResponse({
        error: 'error',
        headers: new HttpHeaders(),
        status: 404
      });

      spyOn(toastr, 'error');

      service.getStore().subscribe({
        error: (message) => {
          expect(message).toBeTruthy();
        }
      });

      const request = httpTestingController.expectOne(apiUrlStore);
      request.flush(mockStore, error);

      expect(toastr.error).toHaveBeenCalled();
      expect(request.request.method).toBe('GET');
    });
  });

  describe('getStatsCategories', () => {
    it('should call the API and return the data', () => {
      var mockStatsCategoriesList = MockStatsCategoriesList;

      service.getStatsCategories().subscribe((data: IStatsCategories[]) => {
        expect(data).toEqual(mockStatsCategoriesList);
      });

      const request = httpTestingController.expectOne(`${apiUrlStore}/stats/categories`);
      request.flush(mockStatsCategoriesList);

      expect(request.request.method).toBe('GET');
    });

    it('should catch the Error and show the error message', () => {
      var mockStatsCategoriesList = MockStatsCategoriesList;

      const error = new HttpErrorResponse({
        error: 'error',
        headers: new HttpHeaders(),
        status: 404
      });

      spyOn(toastr, 'error');

      service.getStatsCategories().subscribe({
        error: (message) => {
          expect(message).toBeTruthy();
        }
      });

      const request = httpTestingController.expectOne(`${apiUrlStore}/stats/categories`);
      request.flush(mockStatsCategoriesList, error);

      expect(toastr.error).toHaveBeenCalled();
      expect(request.request.method).toBe('GET');
    });
  });

  describe('getProducts', () => {
    it('should call the API and return the data', () => {
      var mockProductList = MockProductList;

      service.getProducts().subscribe((data: IProduct[]) => {
        expect(data).toEqual(mockProductList);
      });

      const request = httpTestingController.expectOne(`${apiUrlStore}/products`);
      request.flush(mockProductList);

      expect(request.request.method).toBe('GET');
    });

    it('should catch the Error and show the error message', () => {
      var mockProductList = MockProductList;

      const error = new HttpErrorResponse({
        error: 'error',
        headers: new HttpHeaders(),
        status: 404
      });

      spyOn(toastr, 'error');

      service.getProducts().subscribe({
        error: (message) => {
          expect(message).toBeTruthy();
        }
      });

      const request = httpTestingController.expectOne(`${apiUrlStore}/products`);
      request.flush(mockProductList, error);

      expect(toastr.error).toHaveBeenCalled();
      expect(request.request.method).toBe('GET');
    });
  });

  describe('saveProductData', () => {
    it('should call the API and return the data', () => {
      var fakeResponse = "test_id";
      var mockProductData = MockProductDataList[0];

      spyOn(toastr, 'success');

      service.saveProductData(mockProductData).subscribe((idCreated: string) => {
        expect(idCreated).toEqual(fakeResponse);
      });

      const request = httpTestingController.expectOne(`${apiUrlStore}/products`);
      request.flush(fakeResponse);

      expect(toastr.success).toHaveBeenCalled();
      expect(request.request.method).toBe('POST');
    });

    it('should catch the Error and show the error message', () => {
      var mockProductData = MockProductDataList[0];

      const error = new HttpErrorResponse({
        error: 'error',
        headers: new HttpHeaders(),
        status: 404
      });

      spyOn(toastr, 'error');

      service.saveProductData(mockProductData).subscribe({
        error: (message) => {
          expect(message).toBeTruthy();
        }
      });

      const request = httpTestingController.expectOne(`${apiUrlStore}/products`);
      request.flush(mockProductData, error);

      expect(toastr.error).toHaveBeenCalled();
      expect(request.request.method).toBe('POST');
    });
  });

  describe('deleteProduct', () => {
    it('should call the API and return the data', () => {
      var fakeId = "test_id";
      spyOn(toastr, 'success');

      service.deleteProduct(fakeId).subscribe(() => {
        expect(toastr.success).toHaveBeenCalled();
      });

      service.deleteProduct(fakeId);

      const request = httpTestingController.expectOne(`${apiUrlStore}/products/${fakeId}`);
      request.flush(null);

      expect(request.request.method).toBe('DELETE');
    });

    it('should catch the Error and show the error message', () => {
      var fakeId = "test_id";

      const error = new HttpErrorResponse({
        error: 'error',
        headers: new HttpHeaders(),
        status: 404
      });

      spyOn(toastr, 'error');

      service.deleteProduct(fakeId).subscribe({
        error: (message) => {
          expect(message).toBeTruthy();
        }
      });

      const request = httpTestingController.expectOne(`${apiUrlStore}/products/${fakeId}`);
      request.flush(null, error);

      expect(toastr.error).toHaveBeenCalled();
      expect(request.request.method).toBe('DELETE');
    });
  });
});
