import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductDialogComponent } from './add-product-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreService } from 'src/app/services/store.service';
import { of } from 'rxjs';
import { MockProductDataList } from 'src/test-mocks/product-data.mock';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

describe('AddProductDialogComponent', () => {
  let component: AddProductDialogComponent;
  let fixture: ComponentFixture<AddProductDialogComponent>;

  let storeService: jasmine.SpyObj<StoreService>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(() => {

    storeService = jasmine.createSpyObj('StoreService', ['saveProductData']);
    storeService.saveProductData.and.returnValue(of(''));

    TestBed.configureTestingModule({
      declarations: [AddProductDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: StoreService, useValue: storeService }
      ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDividerModule,
        MatIconModule
      ]
    });
    fixture = TestBed.createComponent(AddProductDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('FormGroup initialization', () => {
    it('should initialize the form with default values', () => {
      fixture.detectChanges();
      expect(component.productDataForm.controls.title.value).toEqual('');
      expect(component.productDataForm.controls.category.value).toEqual('');
      expect(component.productDataForm.controls.price.value).toEqual(0);
      expect(component.productDataForm.controls.employee?.value).toEqual('');
      expect(component.productDataForm.controls.description?.value).toEqual('');
      expect(component.productDataForm.controls.reviews?.value).toEqual([]);
    });
  });

  describe('saveForm', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should save the data if the form is valid - all fields provided', () => {
      var idCreated = 'test_id';
      var data = MockProductDataList[0];

      component.productDataForm.controls.title.patchValue(data.title);
      component.productDataForm.controls.category.patchValue(data.category);
      component.productDataForm.controls.price.patchValue(data.price);
      component.productDataForm.controls.employee?.patchValue(data.employee ? data.employee : null);
      component.productDataForm.controls.description?.patchValue(data.description ? data.description : null);
      component.productDataForm.controls.reviews?.patchValue(data.reviews ? data.reviews : []);

      mockDialogRef.close = jasmine.createSpy('close');
      storeService.saveProductData.and.returnValue(of(idCreated));

      component.saveForm();

      expect(component.productDataForm.valid).toBeTruthy();
      expect(mockDialogRef.close).toHaveBeenCalledWith(idCreated);
      expect(component.isLoading).toBeFalsy();
    });

    it('should save the data if the form is valid - only mandatory fields', () => {
      var idCreated = 'test_id';
      var data = MockProductDataList[0];

      component.productDataForm.controls.title.patchValue(data.title);
      component.productDataForm.controls.category.patchValue(data.category);
      component.productDataForm.controls.price.patchValue(data.price);

      mockDialogRef.close = jasmine.createSpy('close');
      storeService.saveProductData.and.returnValue(of(idCreated));

      component.saveForm();

      expect(component.productDataForm.valid).toBeTruthy();
      expect(mockDialogRef.close).toHaveBeenCalledWith(idCreated);
      expect(component.isLoading).toBeFalsy();
    });

    it('should not save the data if the form is invalid - title not provided', () => {
      var idCreated = 'test_id';
      var data = MockProductDataList[0];

       // title not provided
      component.productDataForm.controls.category.patchValue(data.category);
      component.productDataForm.controls.price.patchValue(data.price);
      component.productDataForm.controls.employee?.patchValue(data.employee ? data.employee : null);
      component.productDataForm.controls.description?.patchValue(data.description ? data.description : null);
      component.productDataForm.controls.reviews?.patchValue(data.reviews ? data.reviews : []);

      mockDialogRef.close = jasmine.createSpy('');
      component.saveForm();

      expect(component.productDataForm.valid).toBeFalsy();
      expect(component.productDataForm.controls.title.hasError('required')).toBeTruthy();
      expect(mockDialogRef.close).not.toHaveBeenCalledWith(idCreated);
      expect(component.isLoading).toBeFalsy();
    });

    it('should not save the data if the form is invalid - category not provided', () => {
      var idCreated = 'test_id';
      var data = MockProductDataList[0];

      component.productDataForm.controls.title.patchValue(data.title);
      // category not provided
      component.productDataForm.controls.price.patchValue(data.price);
      component.productDataForm.controls.employee?.patchValue(data.employee ? data.employee : null);
      component.productDataForm.controls.description?.patchValue(data.description ? data.description : null);
      component.productDataForm.controls.reviews?.patchValue(data.reviews ? data.reviews : []);

      mockDialogRef.close = jasmine.createSpy('');
      component.saveForm();

      expect(component.productDataForm.valid).toBeFalsy();
      expect(component.productDataForm.controls.category.hasError('required')).toBeTruthy();
      expect(mockDialogRef.close).not.toHaveBeenCalledWith(idCreated);
      expect(component.isLoading).toBeFalsy();
    });

    it('should not save the data if the form is invalid - price negative', () => {
      var idCreated = 'test_id';
      var data = MockProductDataList[0];

      component.productDataForm.controls.title.patchValue(data.title);
      component.productDataForm.controls.category.patchValue(data.category);
      component.productDataForm.controls.price.patchValue(-1); // price negative
      component.productDataForm.controls.employee?.patchValue(data.employee ? data.employee : null);
      component.productDataForm.controls.description?.patchValue(data.description ? data.description : null);
      component.productDataForm.controls.reviews?.patchValue(data.reviews ? data.reviews : []);

      mockDialogRef.close = jasmine.createSpy('');
      component.saveForm();

      expect(component.productDataForm.valid).toBeFalsy();
      expect(component.productDataForm.controls.price.hasError('min')).toBeTruthy();
      expect(mockDialogRef.close).not.toHaveBeenCalledWith(idCreated);
      expect(component.isLoading).toBeFalsy();
    });

    it('should not save the data if the form is invalid - fields max length exceeded', () => {
      var idCreated = 'test_id';
      var data = MockProductDataList[3];

      component.productDataForm.controls.title.patchValue(data.title);
      component.productDataForm.controls.category.patchValue(data.category);
      component.productDataForm.controls.price.patchValue(data.price);
      component.productDataForm.controls.employee?.patchValue(data.employee ? data.employee : null);
      component.productDataForm.controls.description?.patchValue(data.description ? data.description : null);
      component.productDataForm.controls.reviews?.patchValue(data.reviews ? data.reviews : []);
      component.singleReviewControl.patchValue(data.reviews![1]);

      mockDialogRef.close = jasmine.createSpy('');
      component.saveForm();

      expect(component.productDataForm.valid).toBeFalsy();
      expect(component.productDataForm.controls.title.hasError('maxlength')).toBeTruthy();
      expect(component.productDataForm.controls.category.hasError('maxlength')).toBeTruthy();
      expect(component.productDataForm.controls.price.hasError('min')).toBeTruthy();
      expect(component.productDataForm.controls.employee?.hasError('maxlength')).toBeTruthy();
      expect(component.productDataForm.controls.description?.hasError('maxlength')).toBeTruthy();
      expect(component.singleReviewControl.hasError('maxlength')).toBeTruthy();
      expect(mockDialogRef.close).not.toHaveBeenCalledWith(idCreated);
      expect(component.isLoading).toBeFalsy();
    });


  });

  describe('onDialogClose', () => {
    it('should close the dialog', () => {
      fixture.detectChanges();

      component.onDialogClose();

      expect(mockDialogRef.close).toHaveBeenCalledWith(null);
    });
  });

  describe('addReview', () => {
    it('should add a review if the value is not null or empty', () => {
      var review = MockProductDataList[0].reviews![0];
      component.singleReviewControl.patchValue(review);

      component.addReview();

      expect(component.productDataForm.controls.reviews?.value?.length).toBe(1);
      expect(component.productDataForm.controls.reviews?.value).toEqual([review]);
      expect(component.singleReviewControl.value).toBe('');
    });

    it('should not add a review if the value is empty', () => {
      component.singleReviewControl.patchValue('');

      component.addReview();

      expect(component.productDataForm.controls.reviews?.value?.length).toBe(0);
      expect(component.singleReviewControl.value).toBe('');
    });

    it('should not add a review if the value contains only spaces', () => {
      component.singleReviewControl.patchValue('  ');

      component.addReview();

      expect(component.productDataForm.controls.reviews?.value?.length).toBe(0);
      expect(component.singleReviewControl.value).toBe('  ');
    });
  });

  describe('deleteReview', () => {
    it('should delete a review if the array is not empty', () => {
      var data = MockProductDataList[0];
      component.productDataForm.controls.reviews?.patchValue(data.reviews ? data.reviews : []);

      expect(component.productDataForm.controls.reviews?.value?.length).toBe(2);

      component.deleteReview(1);

      expect(component.productDataForm.controls.reviews?.value?.length).toBe(1);
    });

    it('should not delete a review if the array is empty', () => {
      component.productDataForm.controls.reviews?.patchValue(null);

      expect(component.productDataForm.controls.reviews?.value).toBeNull();

      component.deleteReview(2);

      expect(component.productDataForm.controls.reviews?.value).toBeNull();
    });
  });
});
