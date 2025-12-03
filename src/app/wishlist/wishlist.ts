import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { wishlistStore } from '../../stores/wishlist.store';
import { ProductDto } from '../../utils/product.schema';
import { cartStore } from '../../stores/cart.store';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent {
  readonly wishlistStore = inject(wishlistStore);
  readonly cartStore = inject(cartStore);

  // Remove product from wishlist
  removeFromWishlist(product: ProductDto) {
    this.wishlistStore.removeFromWishlist(product.id);
  }

  // Toggle product in wishlist (alternative approach)
  toggleWishlist(product: ProductDto) {
    this.wishlistStore.toggle(product);
  }

  // Add product to cart and optionally remove from wishlist
  addToCart(product: ProductDto, removeFromWishlist: boolean = false) {
    this.cartStore.addToCart(product);
    if (removeFromWishlist) {
      this.wishlistStore.removeFromWishlist(product.id);
    }
  }

  // Clear entire wishlist
  clearWishlist() {
    this.wishlistStore.clearWishlist();
  }

  // Check if product is in wishlist (redundant but available)
  isInWishlist(product: ProductDto): boolean {
    return this.wishlistStore.isInWishlist(product);
  }
}
