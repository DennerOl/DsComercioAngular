import { Component, Input } from '@angular/core';
import {
  ProductCategoryDTO,
  ProductDTO,
} from 'src/app/pages/services/types/product';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product?: ProductCategoryDTO;
  id: number | undefined;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(parseInt(id))) {
      // Verifica se o ID é válido
      this.productsService.buscarPorId(parseInt(id)).subscribe((product) => {
        this.product = product;
      });
    }
  }
}
