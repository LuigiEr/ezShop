import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private dialogRef: MatDialogRef<AddProductDialogComponent>, private readonly storeService: StoreService) {
    this.isLoading = false;

    this.singleReviewControl = new FormControl<string>('', { nonNullable: true });

    this.productDataForm = new FormGroup<IProductDataForm>({
      title: new FormControl('', { nonNullable: true }),
      category: new FormControl('', { nonNullable: true }),
      price: new FormControl(0, { nonNullable: true }),
      employee: new FormControl('', { nonNullable: false }),
      description: new FormControl('', { nonNullable: false }),
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
          console.log("idCreated", idCreated)
          this.isLoading = false;
          this.dialogRef.close(idCreated);
        },
        error: () => {
          this.isLoading = false;
        }
      })
  }
}
