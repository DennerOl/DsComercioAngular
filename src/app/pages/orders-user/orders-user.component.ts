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
  orders: OrderDTO[] = []; // Um array para armazenar os pedidos

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // Chama o serviço para obter os dados do pedido
    this.orderService.findAllRequest().subscribe((data) => {
      this.orders = data.content; // Armazena os pedidos
    });
  }
}
