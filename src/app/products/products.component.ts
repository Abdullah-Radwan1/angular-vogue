import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productStore } from '../../stores/product.store';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import untilDestroyed from '../../utils/untilDestroyed';
import { cartStore } from '../../stores/cart.store';
import { ProductDto } from '../../utils/product.schema';
import { FiltersComponent } from '../components/filters/filters.component';
import { Skeleton } from '../components/skeleton/skeleton';

@Component({
  selector: 'app-product',
  imports: [CommonModule, ProductCardComponent, FormsModule, FiltersComponent, Skeleton],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  addToCart(product: ProductDto) {
    this.cartStore.addToCart(product);
  }

  cartStore = inject(cartStore);
  productStore = inject(productStore);

  destroy = untilDestroyed();
}
