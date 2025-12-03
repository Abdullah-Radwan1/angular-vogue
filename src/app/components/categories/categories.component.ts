import { Component, signal, inject } from '@angular/core';
import { productStore } from '../../../stores/product.store';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ProductCardComponent], // no CommonModule needed for @for/@if in Angular 20
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss'],
})
export class Categories {
  categories = ['ALL', 'CHAIRS', 'CLOCKS', 'LAMPS', 'TABLES', 'ACCESSORIES'];

  productStore = inject(productStore);

  selectedCategory = signal('ALL');

  ngOnInit() {
    // load 8 default products instantly
    this.productStore.loadCategoryproducts('ALL');
  }
  selectCategory(category: string) {
    this.selectedCategory.set(category);

    this.productStore.loadCategoryproducts(category);
  }
}
