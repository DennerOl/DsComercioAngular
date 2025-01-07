import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderDTO } from '../services/types/order';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.scss'],
})
export class OrdersUserComponent {
  orders: OrderDTO[] = [];
  paginaAtual: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // Chama o serviço para obter os dados do pedido
    this.orderService.findAllRequest(this.paginaAtual).subscribe((data) => {
      this.orders = data.content; // Armazena os pedidos
    });
  }

  carregarMaisProducts() {
    this.orderService
      .findAllRequest(++this.paginaAtual)
      .subscribe((listaOrders) => {
        this.orders.push(...listaOrders.content);
      });
  }
}
