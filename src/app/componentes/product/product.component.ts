import { Component, Input } from '@angular/core';
import { ProductDTO } from '../../pages/services/types/product';
import { ProductsService } from 'src/app/pages/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product?: ProductDTO;

  constructor(private productsService: ProductsService) {}

  getFormattedPrice(): string {
    return this.productsService.formatCurrency(this.product?.price);
  }
}
