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
        products: [{title: trim(product.title)
        , description: trim(product.description)
        , price: trim(product.price)}
        , ...state.products]
      });

    case productActions.ActionTypes.REMOVE:
      stateCopy.products = without(state.products, action.payload);
      product.removed = !product.removed;
      stateCopy.products.unshift(product);
      return merge({}, stateCopy);

    case productActions.ActionTypes.TOGGLE_CART:
      stateCopy.products = without(state.products, action.payload);
      product.inCart = !product.inCart;
      stateCopy.products.unshift(product);
      return merge({}, stateCopy);

    default:
      return state;
  }
}

export const getProducts = (state: productsListModel.ProductsList) => state.products;
