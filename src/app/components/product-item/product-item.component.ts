import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { IProduct, IProductData } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnChanges {

  @Input() product!: IProduct;
  @Output() deleteProductEvent = new EventEmitter<IProduct>();

  panelOpenState = false;
  reviewsCount: number = 0;

  ngOnChanges(changes: SimpleChanges) {
     var count = this.product.data?.reviews?.length;
     this.reviewsCount = count == null ? 0 : count;
  }

  deleteProduct(product: IProduct): void {
    console.log(product);
    this.deleteProductEvent.emit(product);
  }

}
