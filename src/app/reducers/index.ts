import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as dataModel from '../models/ICardsList';
import * as uiModel from '../models/IUi';

import * as fromCards from './cards';
import * as fromUi from './ui';

export interface State {
  data: dataModel.CardsList;
  ui: uiModel.Ui;
}

const reducers = {
  data: fromCards.reducer,
  ui: fromUi.reducer,
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

export const getCards = createSelector(getDataState, fromCards.getCards);

/* Data */

export const getUiState = (state: State) => state.ui;

export const getToolbarColor = createSelector(getUiState, fromUi.getToolbarColor);
