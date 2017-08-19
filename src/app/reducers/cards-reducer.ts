import {Action} from '@ngrx/store';
import * as dataModel from '../models/ICardsList';
import * as data from '../actions/card-actions';
import {merge, without, clone, trim} from 'lodash';


export function reducer(state = dataModel.defaults, action: Action): dataModel.CardsList {
  switch (action.type) {
    case data.ActionTypes.ADD:
      return merge({}, state, {cards: [...state.cards, {text: trim(action.payload)}]});

    case data.ActionTypes.REMOVE:
      const stateCopy = clone(state);
      stateCopy.cards = [];
      return merge({}, stateCopy.cards, {cards: without(state.cards, action.payload)});

    default:
      return state;
  }
}

export const getCards = (state: dataModel.CardsList) => state.cards;
