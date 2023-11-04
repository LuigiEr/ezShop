import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  isLoading: boolean = false;

  constructor(private readonly storeService: StoreService, private toastr: ToastrService) {}

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

  }

}
