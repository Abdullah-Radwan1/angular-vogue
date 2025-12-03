import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ProductDto } from '../utils/product.schema';
const cart_localstorage_key = 'cart_localstorage_key';
type cartItem = ProductDto & {
  quantity: number;
};
type cartState = { items: cartItem[] };
const initialState: cartState = {
  items: [],
};

export const cartStore = signalStore(
  { providedIn: 'root' },
  withState(() => {
    if ('localStorage' in globalThis) {
      return {
        items: JSON.parse(localStorage.getItem(cart_localstorage_key) || '[]') as cartItem[],
      };
    }
    return initialState;
  }),
  withMethods((store) => ({
    addToCart(product: ProductDto) {
      const currentItems = store.items();
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Item exists - increment quantity
        const updatedItems = currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        patchState(store, { items: updatedItems });
      } else {
        // New item - add to cart
        patchState(store, {
          items: [...currentItems, { ...product, quantity: 1 }],
        });
      }
      localStorage.setItem(cart_localstorage_key, JSON.stringify(store.items()));
    },
    clearCart() {
      patchState(store, { items: [] });
      localStorage.setItem(cart_localstorage_key, JSON.stringify(store.items()));
    },
    removeFromCart(id: string) {
      const currentItems = store.items();
      const updatedItems = currentItems.filter((item) => item.id !== id);
      patchState(store, { items: updatedItems });
      localStorage.setItem(cart_localstorage_key, JSON.stringify(store.items()));
    },
    increasequantity(id: string) {
      const currentItems = store.items();
      const updatedItems = currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      patchState(store, { items: updatedItems });
      localStorage.setItem(cart_localstorage_key, JSON.stringify(store.items()));
    },
    decreasequantity(id: string) {
      const currentItems = store.items();
      const updatedItems = currentItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0); // Now removal works correctly
      patchState(store, { items: updatedItems });
      localStorage.setItem(cart_localstorage_key, JSON.stringify(store.items()));
    },
  })),

  withComputed((store) => ({
    totalItems: computed(() =>
      store.items().reduce((acc, item) => {
        return acc + item.quantity;
      }, 0)
    ),
    totalAmount: computed(() =>
      store.items().reduce((acc, item) => {
        return acc + item.quantity * item.price;
      }, 0)
    ),
  }))
);
