import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as dataModel from '../models/ICardsList';
import * as fromData from './cards-reducer';

export interface State {
  data: dataModel.CardsList;
}

const reducers = {
  data: fromData.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeLogger(), storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = compose(combineReducers)(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

/* CardsList */

export const getDataState = (state: State) => state.data;

export const getCards = createSelector(getDataState, fromData.getCards);