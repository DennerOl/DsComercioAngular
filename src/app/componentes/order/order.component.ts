import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/pages/services/order.service';
import { OrderDTO } from 'src/app/pages/services/types/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
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
