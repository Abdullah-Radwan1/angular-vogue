import { inject, Injectable } from '@angular/core';
import { cartStore } from '../stores/cart.store';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  store = inject(cartStore);
  http = inject(HttpClient);
  createCheckoutSession() {
    const items = this.store.items();
    const totalAmount = this.store.totalAmount();

    return this.http.post<{ url: string }>(
      //todo
      'http://localhost:3000/checkout',
      {
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          stripePriceId: item.stripePriceId,
          quantity: item.quantity,
        })),
        totalAmount,
      }
    );
  }
}
