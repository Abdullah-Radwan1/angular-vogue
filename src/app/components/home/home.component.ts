import { Component } from '@angular/core';
import { productStore } from '../../../stores/product.store';
import { cartStore } from '../../../stores/cart.store';
import { Banner } from '../banner/banner';
import { Categories } from '../categories/categories.component';
import { Footer } from '../footer/footer';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // corrected "styleUrl" -> "styleUrls"
  imports: [Banner, Categories, Footer], // 🔥 Add Banner to imports array
})
export class HomeComponent {
  constructor() {
    // this.productStore.loadFeaturedProducts();
  }
}
