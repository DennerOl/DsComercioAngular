import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/pages/services/cart/cart.service';
import { OrderService } from 'src/app/pages/services/order.service';
import { OrderDTO } from 'src/app/pages/services/types/order';
import { ProductDTO } from 'src/app/pages/services/types/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart: OrderDTO = { items: [], total: 0 };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = this.cartService.getCart();
    this.updateCartTotal();
  }

  updateCartTotal(): void {
    this.cart = {
      ...this.cart,
      total: this.cart.items.reduce((acc, item) => acc + item.subTotal, 0),
    };
  }

  handleClearClick(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  handleIncreaseItem(productId: number): void {
    this.cartService.increaseItem(productId);
    this.loadCart();
  }

  handleDecreaseItem(productId: number): void {
    this.cartService.decreaseItem(productId);
    this.loadCart();
  }

  handlePlaceOrderClick(): void {
    this.orderService.placeOrderRequest(this.cart).subscribe((response) => {
      this.cartService.clearCart();
      this.router.navigate([`/confirmation/${response.id}`]);
    });
  }
}
