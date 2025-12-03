import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: async () => {
      const mod = await import('./components/home/home.component');
      return mod.HomeComponent;
    },
  },
  {
    path: 'cart',
    loadComponent: async () => {
      const mod = await import('../app/cart/cart.component');
      return mod.CartComponent;
    },
  },
  {
    path: 'products',
    loadComponent: async () => {
      const mod = await import('../app/products/products.component');
      return mod.ProductsComponent;
    },
  },
  {
    path: 'about',
    loadComponent: async () => {
      const mod = await import('../app/about/about.component');
      return mod.AboutComponent;
    },
  },
  {
    path: 'wishlist',
    loadComponent: async () => {
      const mod = await import('../app/wishlist/wishlist');
      return mod.WishlistComponent;
    },
  },
  {
    path: 'checkout',
    loadComponent: async () => {
      const mod = await import('../app/checkout/checkout.component');
      return mod.CheckoutComponent;
    },
  },
  {
    path: 'checkout/cancel',
    loadComponent: async () => {
      const mod = await import('./checkout/checkout-failure/checkout-failure.component');
      return mod.CheckoutFailureComponent;
    },
  },
  {
    path: 'checkout/success',
    loadComponent: async () => {
      const mod = await import('./checkout/checkout-success/checkout-success.component');
      return mod.CheckoutSuccessComponent;
    },
  },

  {
    path: 'product/:id',
    loadComponent: async () => {
      const mod = await import('./product-details/product-details.component');
      return mod.ProductDetails;
    },
  },
];
