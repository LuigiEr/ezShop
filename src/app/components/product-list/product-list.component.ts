import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { StoreService } from 'src/app/services/store.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  isLoading: boolean = false;

  constructor(private readonly storeService: StoreService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.storeService.getProducts().subscribe((products: Product[]) => {

      this.products = products;

      console.log(this.products);

      this.isLoading = false;
    },
    () => {
      this.isLoading = false;
    });
  }

  addProduct(): void {
    console.log("dialog");
    const dialogRef = this.dialog.open(AddProductDialogComponent,  {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

}
