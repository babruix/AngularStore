import {Action} from '@ngrx/store';
import * as cardsListModel from '../models/ICardsList';
import * as cardActions from '../actions/card';
import {merge, without, clone, trim} from 'lodash';


export function reducer(state = cardsListModel.defaults, action: Action): cardsListModel.CardsList {
  const stateCopy = clone(state);

  switch (action.type) {
    case cardActions.ActionTypes.ADD:
      return merge({}, state, {
        cards: [{text: trim(action.payload)}, ...state.cards]
      });

    case cardActions.ActionTypes.REMOVE:
      stateCopy.cards = [];
      return merge({}, stateCopy.cards, {cards: without(state.cards, action.payload)});

    case cardActions.ActionTypes.TOGGLE_PINNED:
      const card = clone(action.payload);
      stateCopy.cards = without(state.cards, action.payload);
      card.pinned = !card.pinned;
      stateCopy.cards.unshift(card);
      return merge({}, stateCopy);

    default:
      return state;
  }
}

export const getCards = (state: cardsListModel.CardsList) => state.cards;
