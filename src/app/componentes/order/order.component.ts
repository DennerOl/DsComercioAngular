import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/pages/services/order.service';
import { OrderDTO } from 'src/app/pages/services/types/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input() order: any = { items: [] };

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscarPedido();
  }

  buscarPedido() {
    // Verifica se o parâmetro 'orderId' está presente na URL
    const orderId = this.route.snapshot.paramMap.get('orderId');

    if (orderId) {
      const numericOrderId = orderId;

      // Verifica se o 'orderId' é um número válido e maior que 0
      if (Number(orderId) <= 0) {
        console.error('ID de pedido inválido:');
        return; // Não faz a requisição se o ID não for válido
      }

      // Se o ID for válido, faz a requisição para buscar o pedido
      this.orderService
        .findByIdRequest(Number(numericOrderId))
        .subscribe((response) => {
          this.order = response;
        });
    }
  }

  /*
  buscarPedido() {
    const orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    this.orderService.findByIdRequest(orderId).subscribe((response) => {
      this.order = response;
    });
  }

  */
}
