import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.interface';
import { StoreService } from 'src/app/services/store.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  isLoading: boolean = true;

  constructor(private readonly storeService: StoreService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.isLoading = true;
    this.storeService.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
      },
      complete: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      height: '600px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((idCreated: string) => {
      if (idCreated && idCreated.trim() !== '') {
        this.getProducts();
      }
    });
  }

  deleteProduct(product: IProduct): void {
    this.storeService.deleteProduct(product.id).subscribe({
      complete: () => {
        this.getProducts();
      },
      error: () => {
        this.isLoading = false;
      }
    })
  }
}
