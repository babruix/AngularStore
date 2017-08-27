import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as productsListModel from '../models/IProductsList';
import * as uiModel from '../models/IUi';

import * as fromProducts from './products';
import * as fromUi from './ui';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
  ProductsList: productsListModel.ProductsList;
  ui: uiModel.Ui;
}

const reducers = {
  ProductsList: fromProducts.reducer,
  ui: fromUi.reducer,
};

const storageSync = localStorageSync({
  keys: ['ui', 'ProductsList'],
  rehydrate: true
});

const developmentReducer: ActionReducer<State> = compose(storeLogger(), storageSync, storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = compose(combineReducers)(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

/* ProductsList */

export const getProductsState = (state: State) => state.ProductsList;

export const getProducts = createSelector(getProductsState, fromProducts.getProducts);

/* UI */

export const getUiState = (state: State) => state.ui;

export const getToolbarColor = createSelector(getUiState, fromUi.getToolbarColor);
