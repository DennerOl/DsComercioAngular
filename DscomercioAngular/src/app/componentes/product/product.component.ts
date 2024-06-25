import { Component, Input } from '@angular/core';
import { ProductDTO } from '../../pages/services/types/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product?: ProductDTO;
}
