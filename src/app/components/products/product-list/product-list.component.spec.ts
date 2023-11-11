import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { StoreService } from 'src/app/services/store.service';
import { MockProductList } from 'src/test-mocks/product.mock';
import { Subscription, of, throwError } from 'rxjs';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { IProduct } from 'src/app/models/product.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let storeService: jasmine.SpyObj<StoreService>;
  let initalProductList: IProduct[];

  beforeEach(() => {
    storeService = jasmine.createSpyObj('StoreService', ['getProducts', 'deleteProduct']);
    initalProductList = [MockProductList[0], MockProductList[1]]
    storeService.getProducts.and.returnValue(of(initalProductList));

    TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductItemComponent, AddProductDialogComponent],
      imports: [
        MatListModule,
        MatCardModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: StoreService, useValue: storeService }
      ]
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should populate the products variable with data coming from the StoreService', () => {
      fixture.detectChanges();

      expect(component.products).toBe(initalProductList);
      expect(component.isLoading).toBeFalsy();
    });

    it('should not populate the products variable due to API error', () => {
      storeService.getProducts.and.returnValue(throwError(() => new Error()));
      fixture.detectChanges();

      expect(component.products).toEqual([]);
      expect(component.isLoading).toBeFalsy();
    });
  });

  describe('addProduct', () => {
    var dialog: MatDialog;
    beforeEach(() => {
      dialog = TestBed.inject(MatDialog);
    });

    it('should open the dialog and close it without adding any new products', () => {
      const openSpy = spyOn(dialog, 'open').and.callThrough();

      const idCreated = null;
      const dialogRef: any = { afterClosed: () => of(idCreated) };
      const afterClosedSpy = spyOn(dialogRef, 'afterClosed').and.callThrough();

      component.addProduct();
      fixture.detectChanges(); // Update the view to render the dialog

      // Expect the dialog to have been opened
      expect(openSpy).toHaveBeenCalledOnceWith(AddProductDialogComponent, {
        height: '600px',
        width: '800px',
      });

      // Simulate the afterClosed callback
      dialogRef.afterClosed().subscribe((result: string) => {
        expect(result).toBeNull();
      });

      // Ensure that afterClosed was called
      expect(afterClosedSpy).toHaveBeenCalled();
      // Ensure no new products are added
      expect(component.products).toEqual(initalProductList);
    });

    it('should open the dialog and close it with adding a new products', () => {
      const idCreated = MockProductList[2].id;

      const openSpy = spyOn(dialog, 'open').and
        .callThrough().and
        .returnValue(
          {
            afterClosed: () => of(idCreated)
          } as MatDialogRef<typeof component>);

      const dialogRef: any = { afterClosed: () => of(idCreated) };
      const afterClosedSpy = spyOn(dialogRef, 'afterClosed').and.callThrough();

      component.addProduct();
      storeService.getProducts.and.returnValue(of(MockProductList));
      fixture.detectChanges(); // Update the view to render the dialog

      // Expect the dialog to have been opened
      expect(openSpy).toHaveBeenCalledOnceWith(AddProductDialogComponent, {
        height: '600px',
        width: '800px',
      });

      // Simulate the afterClosed callback
      dialogRef.afterClosed().subscribe((result: string) => {
        expect(result).toBe(idCreated);
      });

      // Ensure that afterClosed was called
      expect(afterClosedSpy).toHaveBeenCalled();
      // Ensure the new products is added
      expect(component.products).toEqual(MockProductList);
    });
  });

  describe('deleteProduct', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should delete the product with success', () => {
      var newProductList: IProduct[] = [MockProductList[0]];
      storeService.getProducts.and.returnValue(of(newProductList));

      storeService.deleteProduct.and.returnValue(of({}));
      component.deleteProduct(MockProductList[1]);

      expect(component.isLoading).toBeFalsy();
      expect(component.products).toEqual(newProductList);
    });

    it('should not delete the product due to API error', () => {
      storeService.getProducts.and.returnValue(throwError(() => new Error()));

      storeService.deleteProduct.and.returnValue(of({}));
      component.deleteProduct(MockProductList[1]);

      expect(component.isLoading).toBeFalsy();
      expect(component.products).toEqual(initalProductList);
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should unsubscribe getProductsSubscription', () => {
      spyOn(component['getProductsSubscription'], 'unsubscribe');

      component.ngOnDestroy();

      expect(component['getProductsSubscription'].unsubscribe).toHaveBeenCalled();
    });

    it('should not unsubscribe getProductsSubscription', () => {
      spyOn(component['getProductsSubscription'], 'unsubscribe');

      // No explicit call to ngOnDestroy

      expect(component['getProductsSubscription'].unsubscribe).not.toHaveBeenCalled();
    });

    it('should unsubscribe deleteProductSubscription', () => {
      storeService.deleteProduct.and.returnValue(of({}));
      component.deleteProduct(MockProductList[1]);

      spyOn(component['deleteProductSubscription'], 'unsubscribe');

      component.ngOnDestroy();

      expect(component['deleteProductSubscription'].unsubscribe).toHaveBeenCalled();
    });

    it('should not unsubscribe deleteProductSubscription', () => {
      storeService.deleteProduct.and.returnValue(of({}));
      component.deleteProduct(MockProductList[1]);

      spyOn(component['deleteProductSubscription'], 'unsubscribe');

      // No explicit call to ngOnDestroy

      expect(component['deleteProductSubscription'].unsubscribe).toHaveBeenCalled();
    });
  });
});
