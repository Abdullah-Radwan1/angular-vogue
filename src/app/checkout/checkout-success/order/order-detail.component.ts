import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../order.types';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule],
  templateUrl: './order-detail.html',
})
export class OrderDetailComponent {
  order = input.required<Order | null>();
}
//   order = input.required<OrderWithItems | null>();
//s
