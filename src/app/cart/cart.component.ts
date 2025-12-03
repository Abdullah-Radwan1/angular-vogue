import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cartStore } from '../../stores/cart.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartStore = inject(cartStore);
  increaseQuantity(id: string) {
    this.cartStore.increasequantity(id);
  }
  decreaseQuantity(id: string) {
    this.cartStore.decreasequantity(id);
  }
}
