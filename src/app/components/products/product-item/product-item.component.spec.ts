import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockProductList } from 'src/test-mocks/product.mock';
import { of } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { IDialogData } from 'src/app/models/dialog-data.interface';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [
        MatDialogModule,
        MatCardModule,
        MatExpansionModule,
        MatListModule,
        MatIconModule,
        BrowserAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.product = MockProductList[0];
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should populate correctly the reviews count variable', () => {
      component.ngOnChanges();

      var count = MockProductList[0].data?.reviews?.length;
      var expectedCount = count == null ? 0 : count;
      expect(component.reviewsCount).toBe(expectedCount);
    });
  });

  describe('deleteProduct', () => {
    var dialog: MatDialog;
    const dialogData: IDialogData = {
      title: 'Are you sure?',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }

    beforeEach(() => {
      dialog = TestBed.inject(MatDialog);
    });

    it('should open the dialog and close it without emitting the deleteProductEvent', () => {
      const openSpy = spyOn(dialog, 'open').and.callThrough();

      const isDeleted = false;
      const dialogRef: any = { afterClosed: () => of(isDeleted) };
      const afterClosedSpy = spyOn(dialogRef, 'afterClosed').and.callThrough();
      spyOn(component.deleteProductEvent, 'emit');

      component.deleteProduct(MockProductList[0]);
      fixture.detectChanges(); // Update the view to render the dialog

      // Expect the dialog to have been opened
      expect(openSpy).toHaveBeenCalledOnceWith(ConfirmDialogComponent, {
        width: '250px',
        data: dialogData
      });

      // Simulate the afterClosed callback
      dialogRef.afterClosed().subscribe((isDeleted: boolean) => {
        expect(isDeleted).toBeFalsy;
      });

      // Ensure that afterClosed was called
      expect(afterClosedSpy).toHaveBeenCalled();
      expect(component.deleteProductEvent.emit).toHaveBeenCalledTimes(0);
    });

    it('should open the dialog, close it and emitting the deleteProductEvent', () => {
      const isDeleted = true;
      const openSpy = spyOn(dialog, 'open').and
        .callThrough().and
        .returnValue(
          {
            afterClosed: () => of(isDeleted)
          } as MatDialogRef<typeof component>);


      const dialogRef: any = { afterClosed: () => of(isDeleted) };
      const afterClosedSpy = spyOn(dialogRef, 'afterClosed').and.callThrough();
      spyOn(component.deleteProductEvent, 'emit');

      component.deleteProduct(MockProductList[0]);
      fixture.detectChanges(); // Update the view to render the dialog

      // Expect the dialog to have been opened
      expect(openSpy).toHaveBeenCalledOnceWith(ConfirmDialogComponent, {
        width: '250px',
        data: dialogData
      });

      // Simulate the afterClosed callback
      dialogRef.afterClosed().subscribe((isDeleted: boolean) => {
        expect(isDeleted).toBeTruthy;
      });

      // Ensure that afterClosed was called
      expect(afterClosedSpy).toHaveBeenCalled();
      expect(component.deleteProductEvent.emit).toHaveBeenCalledTimes(1);
    });
  });
});
