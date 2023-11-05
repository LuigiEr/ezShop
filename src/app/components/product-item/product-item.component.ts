import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProduct, IProductData } from 'src/app/models/product.interface';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { IDialogData } from 'src/app/models/dialog-data.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnChanges {

  @Input() product!: IProduct;
  @Output() deleteProductEvent = new EventEmitter<IProduct>();

  constructor(public dialog: MatDialog) { }

  panelOpenState = false;
  reviewsCount: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    var count = this.product.data?.reviews?.length;
    this.reviewsCount = count == null ? 0 : count;
  }

  deleteProduct(product: IProduct): void {

    const dialogData: IDialogData = {
      title: 'Are you sure?',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((isDeleted) => {
      if (isDeleted) {
        this.deleteProductEvent.emit(product);
      }
    });
  }
}
