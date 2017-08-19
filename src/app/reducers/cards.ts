import {Action} from '@ngrx/store';
import * as cardsListModel from '../models/ICardsList';
import * as cardActions from '../actions/card';
import {merge, without, clone, trim} from 'lodash';


export function reducer(state = cardsListModel.defaults, action: Action): cardsListModel.CardsList {
  switch (action.type) {
    case cardActions.ActionTypes.ADD:
      return merge({}, state, {cards: [...state.cards, {text: trim(action.payload)}]});

    case cardActions.ActionTypes.REMOVE:
      const stateCopy = clone(state);
      stateCopy.cards = [];
      return merge({}, stateCopy.cards, {cards: without(state.cards, action.payload)});

    default:
      return state;
  }
}

export const getCards = (state: cardsListModel.CardsList) => state.cards;
