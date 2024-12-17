import { Component, Input } from '@angular/core';
import {
  ProductCategoryDTO,
  ProductDTO,
} from 'src/app/pages/services/types/product';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { CartCountService } from '../services/cart/cart-count.service';
import { UserService } from '../services/serviceUser/user.service';

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
    private route: ActivatedRoute,
    private cartService: CartService,
    private cartCountService: CartCountService,
    private userService: UserService
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

  user$ = this.userService.retornarUser();

  handleByClick(): void {
    // Subscribe to the user$ Observable to check if the user is authenticated
    this.user$.subscribe((user) => {
      if (user) {
        // Assuming `user.token` holds the JWT token
        if (this.product) {
          this.cartService.addProduct(this.product);
          const cart = this.cartService.getCart();
          this.cartCountService.setContextCartCount(cart.items.length); // Implementar método ou lógica para definir a contagem no contexto
          this.router.navigate(['/shoppingCart']);
        }
      } else {
        // Redirect to login page or show an appropriate message
        this.router.navigate(['/login']);
      }
    });
  }

  getFormattedPrice(): string {
    return this.productsService.formatCurrency(this.product?.price);
  }
}
