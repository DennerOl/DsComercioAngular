import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { OrderDTO } from '../services/types/order';

@Component({
  selector: 'app-confirmation-cart',
  templateUrl: './confirmation-cart.component.html',
  styleUrls: ['./confirmation-cart.component.scss'],
})
export class ConfirmationCartComponent {}
