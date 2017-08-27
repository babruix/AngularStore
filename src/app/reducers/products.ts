import { Action } from '@ngrx/store';
import * as productsListModel from '../models/IProductsList';
import * as productActions from '../actions/product';
import { merge, without, clone, trim } from 'lodash';


export function reducer(state = productsListModel.defaults, action: Action): productsListModel.ProductsList {
  const stateCopy = clone(state);
  const product = clone(action.payload);

  switch (action.type) {
    case productActions.ActionTypes.ADD:
      return merge({}, state, {
        products: [{text: trim(product)}, ...state.products]
      });

    case productActions.ActionTypes.REMOVE:
      stateCopy.products = without(state.products, action.payload);
      product.removed = !product.removed;
      stateCopy.products.unshift(product);
      return merge({}, stateCopy);

    case productActions.ActionTypes.TOGGLE_PINNED:
      stateCopy.products = without(state.products, action.payload);
      product.pinned = !product.pinned;
      stateCopy.products.unshift(product);
      return merge({}, stateCopy);

    default:
      return state;
  }
}

export const getProducts = (state: productsListModel.ProductsList) => state.products;
