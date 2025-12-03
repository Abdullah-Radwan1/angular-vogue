import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Apollo, gql } from 'apollo-angular';
import { tap } from 'rxjs';

const GET_ORDER = gql`
  query GetOrder($id: String!) {
    order(id: $id) {
      id
      status
      totalAmount
      createdAt
      updatedAt
      items {
        id
        quantity
        price
        product {
          id
          name
          price
          image
        }
      }
      createdAt
    }
  }
`;
const initialState = {
  orders: [],
  orderDetail: null,
  error: null,
  loading: false,
};
export const OrderStore = signalStore(
  { providedIn: 'root' },

  withState(() => initialState),
  withMethods((store, appolo = inject(Apollo)) => ({
    getOrder(id: string) {
      patchState(store, { loading: true, error: null });
      return appolo
        .query<{ order: any }>({
          query: GET_ORDER,
          variables: { id },
        })
        .pipe(
          tap({
            next: ({ data }) => patchState(store, { orderDetail: data.order, loading: false }),
            error: (error) => patchState(store, { error: error.message, loading: false }),
          })
        );
    },
    setError(error: any) {
      patchState(store, {
        error,
      });
    },
  }))
);
