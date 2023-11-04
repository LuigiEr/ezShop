import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Product, ProductData } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnChanges {

  @Input() product!: Product;
  panelOpenState = false;
  reviewsCount: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    this.reviewsCount = this.product.data?.reviews?.length;
  }

  deleteProduct(product: Product): void {

  }

}
