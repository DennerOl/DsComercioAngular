import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { OrderDTO } from '../services/types/order';

@Component({
  selector: 'app-confirmation-cart',
  templateUrl: './confirmation-cart.component.html',
  styleUrls: ['./confirmation-cart.component.scss'],
})
export class ConfirmationCartComponent {
  order?: OrderDTO;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscarPedido();
  }

  buscarPedido() {
    const orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    this.orderService.findByIdRequest(orderId).subscribe((response) => {
      this.order = response;
    });
  }
}
