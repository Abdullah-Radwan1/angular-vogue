import { Component, input, output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDto } from '../../../utils/product.schema';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../../services/taost.service';
import { wishlistStore } from '../../../stores/wishlist.store';
import { productStore } from '../../../stores/product.store';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  product = input.required<ProductDto>();
  addToCart = output<ProductDto>();

  productStore = inject(productStore);

  constructor(private toast: ToastService) {}

  onAddToCart(product: ProductDto) {
    this.addToCart.emit(product);
    this.toast.show('Product added to cart!', 'success');
  }
}
