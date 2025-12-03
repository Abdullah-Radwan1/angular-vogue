import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { productStore } from '../../stores/product.store';
import { cartStore } from '../../stores/cart.store';
import { Subject, takeUntil } from 'rxjs';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { HeartIcon, LucideAngularModule, Check } from 'lucide-angular';
import { wishlistStore } from '../../stores/wishlist.store';
import { ToastService } from '../../services/taost.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, LucideAngularModule, ProductCardComponent],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnDestroy {
  // Inject the product store to access products, featured products, and selected product
  productStore = inject(productStore);
  wishlistStore = inject(wishlistStore);
  // Inject the cart store to handle adding products to cart
  cartStore = inject(cartStore);

  toast = inject(ToastService);

  // Inject ActivatedRoute to access route parameters, e.g., the product ID
  route = inject(ActivatedRoute);

  // A Subject used as a "destroy notifier" to automatically unsubscribe from Observables
  private destroy$ = new Subject<void>();

  constructor() {
    // Subscribe to changes in the route parameters (e.g., /product/:id)
    // 'takeUntil(this.destroy$)' ensures the subscription is automatically unsubscribed when the component is destroyed
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params.get('id');

      this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe((queryParams) => {
        const Category = queryParams.get('Category') || 'CHAIRS';
        if (id && Category) {
          this.productStore.clearSelectedProduct();
          this.productStore.loadProductById(id);
          this.productStore.loadRelatedProducts(Category);

          console.log(this.productStore.loadProductById(id));
        }
      });
    });
  }

  // Method to add a product to the cart
  addToCart(product: any) {
    this.cartStore.addToCart(product);
    this.toast.show(`${product.name} Added To Cart!`, 'success');
  }
  toggleWishlist(product: any) {
    this.wishlistStore.toggle(product);
    const isInWishlist = this.wishlistStore.isInWishlist(product);
    this.toast.show(
      `${product.name} ${isInWishlist ? 'added to' : 'removed from'} wishlist!`,
      'success'
    );
  }
  Heart = HeartIcon;
  Check = Check;
  // Angular lifecycle hook that runs when the component is destroyed
  ngOnDestroy() {
    // Emit a value to destroy$ to signal Observables using takeUntil to unsubscribe
    this.destroy$.next();

    // Complete the destroy$ Subject to clean up memory
    this.destroy$.complete();
  }
}
