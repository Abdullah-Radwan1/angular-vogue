import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import {
  Clock,
  Coffee,
  LampCeiling,
  LucideAngularModule,
  RadioReceiver,
  Search,
  SlidersHorizontal,
  Sofa,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { productStore } from '../../../stores/product.store';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms'; // ✅ Add this
import { ActivatedRoute } from '@angular/router';

export type SortOption = 'price-low-high' | 'price-high-low' | 'name-a-z' | 'name-z-a';

@Component({
  selector: 'app-filters',
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.scss',
})
export class FiltersComponent implements OnInit {
  RadioReceiver = RadioReceiver;
  Sofa = Sofa;
  Clock = Clock;
  LampCeiling = LampCeiling;
  Coffee = Coffee;
  constructor(private route: ActivatedRoute) {}
  // search icon
  Search = Search;
  // search term
  searchSubject = new Subject<string>();
  productStore = inject(productStore);

  searchTerm = '';
  onSearch(term: string) {
    this.searchSubject.next(term);
    this.applyFilters(); // apply all filters including search
  }
  sortOptions = [
    { label: 'Price: Low to High', value: 'price-low-high' },
    { label: 'Price: High to Low', value: 'price-high-low' },
    { label: 'Name: A to Z', value: 'name-a-z' },
    { label: 'Name: Z to A', value: 'name-z-a' },
  ];
  @Output() filtersChanged = new EventEmitter<any>();

  SlidersHorizontal = SlidersHorizontal;

  minPrice: number = 0;
  maxPrice: number = 350;
  sortOption: SortOption = 'price-low-high';
  selectedCategories: string[] = [];

  categories = [
    { value: 'TABLES', label: 'Tables', icon: this.RadioReceiver },
    { value: 'CHAIRS', label: 'Chairs', icon: this.Sofa },
    { value: 'CLOCKS', label: 'Clocks', icon: this.Clock },
    { value: 'LAMPS', label: 'Lamps', icon: this.LampCeiling },
    { value: 'ACCESSORIES', label: 'Accessories', icon: this.Coffee },
  ];

  ngOnInit() {
    // Read query params
    this.route.queryParams.subscribe((params) => {
      // Example: ?category=CHAIRS&minPrice=0&maxPrice=350&sort=price-low-high&search=lamp
      if (params['category']) {
        this.selectedCategories = params['category'].split(','); // handle multiple categories
      }
      if (params['minPrice']) {
        this.minPrice = +params['minPrice'];
      }
      if (params['maxPrice']) {
        this.maxPrice = +params['maxPrice'];
      }
      if (params['sort']) {
        this.sortOption = params['sort'];
      }
      if (params['search']) {
        this.searchTerm = params['search'];
      }

      // Apply filters immediately with query params
      this.applyFilters();
    });
  }

  onMinPriceChange(event: any) {
    const newMinPrice = parseInt(event.target.value);
    if (newMinPrice <= this.maxPrice) {
      this.minPrice = newMinPrice;
      this.applyFilters();
    }
  }

  onMaxPriceChange(event: any) {
    const newMaxPrice = parseInt(event.target.value);
    if (newMaxPrice >= this.minPrice) {
      this.maxPrice = newMaxPrice;
      this.applyFilters();
    }
  }

  onSortChange(event: any) {
    this.sortOption = event.target.value;
    this.applyFilters();
  }

  onCategoryChange(category: string, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter((c) => c !== category);
    }
    this.applyFilters();
  }

  clearFilters() {
    this.minPrice = 0;
    this.maxPrice = 350;
    this.sortOption = 'price-low-high';
    this.selectedCategories = [];
    this.applyFilters();
  }

  formatCategoryName(category: string): string {
    return category.charAt(0) + category.slice(1).toLowerCase();
  }

  private applyFilters() {
    // 🔥 Call the store function directly instead of emitting
    this.productStore.loadFilterdProducts({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sort: this.sortOption,
      categories: this.selectedCategories,
      search: this.searchTerm, // ✅ include search term here
    });

    // Still emit in case parent wants to know about filter change
    this.filtersChanged.emit({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sort: this.sortOption,
      categories: this.selectedCategories,
      search: this.searchTerm, // ✅ include search term here
    });
  }
}
