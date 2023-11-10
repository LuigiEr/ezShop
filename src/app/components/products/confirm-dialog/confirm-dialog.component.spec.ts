import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      imports: [
        MatDialogModule
      ]
    });
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onConfirm', () => {
    it('should close the dialog with true', () => {
      mockDialogRef.close = jasmine.createSpy('close');

      component.onConfirm();

      expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });
  });

  describe('onCancel', () => {
    it('should close the dialog with false', () => {
      mockDialogRef.close = jasmine.createSpy('close');

      component.onCancel();

      expect(mockDialogRef.close).toHaveBeenCalledWith(false);
    });
  });
});
