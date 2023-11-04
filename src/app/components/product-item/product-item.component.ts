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
     var count = this.product.data?.reviews?.length;
     this.reviewsCount = count == null ? 0 : count;
  }

  deleteProduct(product: Product): void {

  }

}
