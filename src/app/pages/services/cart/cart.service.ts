import { Injectable } from '@angular/core';
import { CartLocalStorageService } from './cart-local-storage.service';
import { OrderDTO, OrderItemDTO } from '../types/order';
import { ProductDTO } from '../types/product';
import { BehaviorSubject } from 'rxjs';

interface Cart {
  items: OrderItemDTO[];
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>(this.getInitialCart());
  cart$ = this.cartSubject.asObservable();

  constructor(private cartLocalStorage: CartLocalStorageService) {}

  private getInitialCart(): Cart {
    // Recupera o carrinho do armazenamento local ou retorna um carrinho vazio se não existir
    const savedCart = this.cartLocalStorage.get();
    return savedCart ? savedCart : { items: [] };
  }

  saveCart(cart: OrderDTO): void {
    this.cartLocalStorage.save(cart);
    this.cartSubject.next(cart);
  }

  getCart(): OrderDTO {
    return this.cartLocalStorage.get();
  }

  addProduct(product: ProductDTO): void {
    const cart = this.getCart();
    const existingItem = cart.items.find((x) => x.productId === product.id);

    if (existingItem) {
      // Incrementa a quantidade do item existente
      existingItem.quantity++;
      this.saveCart(cart);
      return;
    }

    // Adiciona um novo item ao carrinho
    const newItem = new OrderItemDTO(
      product.id!,
      1, // Quantidade inicial de 1
      product.name,
      product.price,
      product.imgUrl
    );

    cart.items.push(newItem);
    this.saveCart(cart);
  }

  clearCart(): void {
    this.cartLocalStorage.clear();
  }

  deleteCart(): void {
    this.cartLocalStorage.excluir();
  }

  increaseItem(productId: number): void {
    const cart = this.cartLocalStorage.get();
    const item = cart.items.find((x) => x.productId === productId);
    if (item) {
      item.quantity++;
      this.cartLocalStorage.save(cart);
    }
  }

  decreaseItem(productId: number): void {
    const cart = this.cartLocalStorage.get();
    const item = cart.items.find((x) => x.productId === productId);

    if (item) {
      item.quantity--;

      if (item.quantity < 1) {
        // Remove o item se a quantidade for menor que 1
        cart.items = cart.items.filter((x) => x.productId !== productId);
      }

      this.cartLocalStorage.save(cart); // Salva o carrinho atualizado
    }
  }
}
