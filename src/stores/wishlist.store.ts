import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ProductDto } from '../utils/product.schema';

const wishlist_localstorage_key = 'wishlist_localstorage_key';

type WishlistState = {
  items: ProductDto[];
};

const initialState: WishlistState = {
  items: [],
};

export const wishlistStore = signalStore(
  { providedIn: 'root' },
  withState(() => {
    if ('localStorage' in globalThis) {
      return {
        items: JSON.parse(localStorage.getItem(wishlist_localstorage_key) || '[]') as ProductDto[],
      };
    }
    return initialState;
  }),

  withMethods((store) => ({
    // Add or remove product from wishlist (toggle functionality)
    toggle(product: ProductDto) {
      const currentItems = store.items();
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Item exists - remove from wishlist
        const updatedItems = currentItems.filter((item) => item.id !== product.id);
        patchState(store, { items: updatedItems });
      } else {
        // New item - add to wishlist
        patchState(store, {
          items: [...currentItems, product],
        });
      }
      localStorage.setItem(wishlist_localstorage_key, JSON.stringify(store.items()));
    },

    // Add specific product to wishlist
    addToWishlist(product: ProductDto) {
      const currentItems = store.items();
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (!existingItem) {
        patchState(store, {
          items: [...currentItems, product],
        });
        localStorage.setItem(wishlist_localstorage_key, JSON.stringify(store.items()));
      }
    },

    // Remove specific product from wishlist
    removeFromWishlist(id: string) {
      const currentItems = store.items();
      const updatedItems = currentItems.filter((item) => item.id !== id);
      patchState(store, { items: updatedItems });
      localStorage.setItem(wishlist_localstorage_key, JSON.stringify(store.items()));
    },

    // Clear entire wishlist
    clearWishlist() {
      patchState(store, { items: [] });
      localStorage.setItem(wishlist_localstorage_key, JSON.stringify(store.items()));
    },

    // Check if product is in wishlist
    isInWishlist(product: ProductDto): boolean {
      return store.items().some((item) => item.id === product.id);
    },

    // Check if product is in wishlist by ID
    isInWishlistById(id: string): boolean {
      return store.items().some((item) => item.id === id);
    },
  })),

  withComputed((store) => ({
    // Total number of items in wishlist
    totalItems: computed(() => store.items().length),

    // Check if wishlist is empty
    isEmpty: computed(() => store.items().length === 0),

    // Get wishlist items count for display
    itemsCount: computed(() => store.items().length),

    // Get wishlist items for iteration
    wishlistItems: computed(() => store.items()),
  }))
);
