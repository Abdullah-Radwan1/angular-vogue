import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeService } from '../../services/stripe.service';
import { cartStore } from '../../stores/cart.store';
import { ToastService } from '../../services/taost.service';
import { Router } from '@angular/router';
import { LoaderIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  cartStore = inject(cartStore);
  stripeService = inject(StripeService);
loading = false;
loader = LoaderIcon
  constructor(private toast: ToastService, private router: Router) {}

  ngOnInit(): void {
    const items = this.cartStore.items();

    if (items.length === 0) {
      this.toast.show('Your cart is empty!');
      this.router.navigate(['/products']); // redirect immediately
      return;
    }
  }

checkout() {
  const items = this.cartStore.items();

  if (items.length === 0) {
    this.toast.show('Your cart is empty!');
    this.router.navigate(['/products']);
    return;
  }

  this.loading = true; // start loading

  this.stripeService.createCheckoutSession().subscribe({
    next: ({ url }) => {
      window.location.href = url; // page will leave, so no need to stop loading
    },
    error: () => {
      this.loading = false;
      this.toast.show('Something went wrong. Try again.');
    }
  });
}

}
