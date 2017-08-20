import { Action } from '@ngrx/store';
import * as cardsListModel from '../models/ICardsList';
import * as cardActions from '../actions/card';
import { merge, without, clone, trim } from 'lodash';


export function reducer(state = cardsListModel.defaults, action: Action): cardsListModel.CardsList {
  const stateCopy = clone(state);
  const card = clone(action.payload);

  switch (action.type) {
    case cardActions.ActionTypes.ADD:
      return merge({}, state, {
        cards: [{text: trim(card)}, ...state.cards]
      });

    case cardActions.ActionTypes.REMOVE:
      stateCopy.cards = without(state.cards, action.payload);
      card.removed = !card.removed;
      stateCopy.cards.unshift(card);
      return merge({}, stateCopy);

    case cardActions.ActionTypes.TOGGLE_PINNED:
      stateCopy.cards = without(state.cards, action.payload);
      card.pinned = !card.pinned;
      stateCopy.cards.unshift(card);
      return merge({}, stateCopy);

    default:
      return state;
  }
}

export const getCards = (state: cardsListModel.CardsList) => state.cards;
