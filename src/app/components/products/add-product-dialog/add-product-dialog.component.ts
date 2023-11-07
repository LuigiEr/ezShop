import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IProductDataForm } from 'src/app/models/product-data.interface';
import { IProductData } from 'src/app/models/product.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent {

  productDataForm;
  singleReviewControl;
  isLoading!: boolean;
  normalFieldMaxLength: number = 35;
  longFieldMaxLength: number = 250;
  minPriceValue: number = 0;

  constructor(private dialogRef: MatDialogRef<AddProductDialogComponent>, private readonly storeService: StoreService) {
    this.isLoading = false;

    this.singleReviewControl = new FormControl<string>('', { nonNullable: true, validators: Validators.maxLength(this.longFieldMaxLength) });

    this.productDataForm = new FormGroup<IProductDataForm>({
      title: new FormControl('', { nonNullable: true, validators: Validators.maxLength(this.normalFieldMaxLength) }),
      category: new FormControl('', { nonNullable: true, validators: Validators.maxLength(this.normalFieldMaxLength) }),
      price: new FormControl(0, { nonNullable: true, validators: Validators.min(this.minPriceValue) }),
      employee: new FormControl('', { nonNullable: false, validators: Validators.maxLength(this.normalFieldMaxLength) }),
      description: new FormControl('', { nonNullable: false, validators: Validators.maxLength(this.longFieldMaxLength) }),
      reviews: new FormControl([], { nonNullable: false }),
    });
  }

  saveForm(): void {
    if (this.productDataForm.valid) {
      var data: IProductData = {
        title: this.productDataForm.controls.title.value,
        category: this.productDataForm.controls.category.value,
        price: this.productDataForm.controls.price.value,
        employee: this.productDataForm.controls?.employee?.value,
        description: this.productDataForm.controls?.description?.value,
        reviews: this.productDataForm.controls?.reviews?.value
      }

      this.saveProductData(data);
    }
  }

  onDialogClose(): void {
    this.dialogRef.close(null);
  }

  addReview(): void {
    var value = this.singleReviewControl.value;
    if (value && value.trim() !== '') {
      this.productDataForm.controls.reviews?.value?.push(value);
      this.singleReviewControl.setValue('');
    }
  }

  removeReview(): void {
    this.productDataForm.controls.reviews?.value?.pop();
  }

  private saveProductData(data: IProductData) {
    this.isLoading = true;
    this.storeService.saveProductData(data).subscribe({
        next: (idCreated: string) => {
          this.isLoading = false;
          this.dialogRef.close(idCreated);
        },
        error: () => {
          this.isLoading = false;
        }
      })
  }
}
