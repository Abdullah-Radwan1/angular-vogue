import { Component } from '@angular/core';
import { Categories } from '../categories/categories.component';
import { Footer } from '../footer/footer';
import { BannerComponent } from '../carousel/carousel.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // corrected "styleUrl" -> "styleUrls"
  imports: [Categories, Footer, BannerComponent], // 🔥 Add Banner to imports array
})
export class HomeComponent {
  constructor() {
    // this.productStore.loadFeaturedProducts();
  }
}
