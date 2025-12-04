import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { catchError, EMPTY } from 'rxjs';
import { featuredDto, ProductDto } from '../utils/product.schema';
import { environment } from '../enviroments/enviroment';

const API_URL = environment.apiUrl;

export interface ProductState {
  products: ProductDto[];
  featuredProducts: featuredDto[];
  relatedProducts: ProductDto[];
  categoryProducts: ProductDto[];
  selectedProduct: ProductDto | null;
  loading: boolean;
  relatedloadig: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  relatedProducts: [],
  featuredProducts: [],
  categoryProducts: [],
  selectedProduct: null,
  loading: false,
  relatedloadig: false,
  error: null,
};

export const productStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, http = inject(HttpClient)) => ({
    // ------------------------------------------------------
    // LOAD ALL PRODUCTS
    // ------------------------------------------------------
    loadProducts: () => {
      patchState(store, { loading: true, error: null });

      http
        .get<ProductDto[]>(`${API_URL}/products`)
        .pipe(
          catchError((err) => {
            patchState(store, { error: err.message, loading: false });
            return EMPTY;
          })
        )
        .subscribe((products) => {
          patchState(store, { products, loading: false });
        });
    },

    // ------------------------------------------------------
    // LOAD PRODUCT BY ID
    // ------------------------------------------------------
    loadProductById: (id: string) => {
      patchState(store, { loading: true, error: null });

      http
        .get<ProductDto>(`${API_URL}/products/${id}`)
        .pipe(
          catchError((err) => {
            patchState(store, { error: err.message, loading: false });
            return EMPTY;
          })
        )
        .subscribe((product) => {
          patchState(store, { selectedProduct: product, loading: false });
        });
    },

    // ------------------------------------------------------
    // CATEGORY PRODUCTS
    // ------------------------------------------------------
    loadCategoryproducts: (category: string) => {
      patchState(store, { loading: true, error: null });

      const params: any = {};
      if (category && category !== 'ALL') params.category = category;

      http.get<ProductDto[]>(`${API_URL}/products/category`, { params }).subscribe((data) => {
        patchState(store, { products: data, loading: false });
      });
    },

    // ------------------------------------------------------
    // RELATED PRODUCTS
    // ------------------------------------------------------
    loadRelatedProducts: (category: string) => {
      patchState(store, { relatedloadig: true });
      http
        .get<ProductDto[]>(`${API_URL}/products/related`, {
          params: { category },
        })
        .subscribe((data) => {
          patchState(store, { relatedProducts: data, relatedloadig: false });
        });
    },

    // ------------------------------------------------------
    // FEATURED PRODUCTS
    // ------------------------------------------------------
    loadFeaturedProducts: () => {
      patchState(store, { loading: true });

      http.get<featuredDto[]>(`${API_URL}/products/featured`).subscribe((data) => {
        patchState(store, { featuredProducts: data, loading: false });
      });
    },

    // ------------------------------------------------------
    // SEARCH PRODUCTS
    // ------------------------------------------------------
    searchProducts: (term: string) => {
      patchState(store, { loading: true, error: null });

      http
        .get<ProductDto[]>(`${API_URL}/products`, {
          params: { search: term },
        })
        .subscribe((data) => {
          patchState(store, { products: data, loading: false });
        });
    },

    // ------------------------------------------------------
    // FILTER PRODUCTS
    // ------------------------------------------------------
    loadFilterdProducts: ({ minPrice, maxPrice, categories, sort, search }: any) => {
      patchState(store, { loading: true, error: null });

      const params: any = {
        minPrice,
        maxPrice,
        sort,
        search,
      };
      if (categories) params.categories = categories.join(',');

      http.get<ProductDto[]>(`${API_URL}/products/filter`, { params }).subscribe((data) => {
        patchState(store, { products: data, loading: false });
      });
    },

    // ------------------------------------------------------
    // CLEAR SELECTION
    // ------------------------------------------------------
    clearSelectedProduct: () => {
      patchState(store, { selectedProduct: null });
    },
  }))
);
