import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStore } from '../../../stores/order.store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderDetailComponent } from './order/order-detail.component';
import { cartStore } from '../../../stores/cart.store';

@Component({
  selector: 'app-checkout-success',
  imports: [CommonModule, OrderDetailComponent, RouterModule],
  templateUrl: './checkout-success.html',
})
export class CheckoutSuccessComponent implements OnInit {
  orderStore = inject(OrderStore);
  route = inject(ActivatedRoute);
  cartStore = inject(cartStore);

  constructor() {
    afterNextRender(() => {
      this.cartStore.clearCart();
    });
  }

  ngOnInit() {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (!orderId) {
      this.orderStore.setError('No order ID found');
      return;
    }
    this.orderStore.getOrder(orderId).subscribe();
  }
}
