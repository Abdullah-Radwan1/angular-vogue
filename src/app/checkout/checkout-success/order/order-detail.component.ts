import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { orderDto } from '../../../../utils/product.schema';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule],
  templateUrl: './order-detail.html',
})
export class OrderDetailComponent {
  order = input.required<orderDto | null>();
}
//   order = input.required<OrderWithItems | null>();
//s
