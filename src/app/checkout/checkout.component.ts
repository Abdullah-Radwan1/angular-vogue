import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeService } from '../../services/stripe.service';
import { cartStore } from '../../stores/cart.store';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  cartStore = inject(cartStore);
  stripeService = inject(StripeService);
  checkout() {
    this.stripeService.createCheckoutSession().subscribe(({ url }) => {
      window.location.href = url;
    });
  }
}
