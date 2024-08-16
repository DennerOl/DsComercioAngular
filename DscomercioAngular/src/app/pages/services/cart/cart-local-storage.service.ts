import { Injectable } from '@angular/core';
import { OrderDTO, OrderItemDTO } from '../types/order';

const Cart_key = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartLocalStorageService {
  // Salva o carrinho no localStorage
  save(cart: OrderDTO): void {
    const str = JSON.stringify(cart);
    localStorage.setItem(Cart_key, str);
  }

  // Recupera o carrinho do localStorage e converte para OrderDTO
  get(): OrderDTO {
    const str = localStorage.getItem(Cart_key) || '{"items":[]}';
    const obj = JSON.parse(str) as OrderDTO;

    const cart = new OrderDTO();
    obj.items.forEach((x: any) => {
      // Converte cada item em OrderItemDTO
      cart.items.push(
        new OrderItemDTO(x.productId, x.quantity, x.name, x.price, x.imgUrl)
      );
    });

    return cart;
  }

  // Limpa o carrinho no localStorage
  clear(): void {
    localStorage.setItem(Cart_key, '{"items":[]}');
  }
}
