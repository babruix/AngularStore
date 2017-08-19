import {Action} from '@ngrx/store';
import * as dataModel from '../models/ICardsList';
import * as data from '../actions/add-card-action';
import {merge} from 'lodash';


export function reducer(state = dataModel.defaults, action: Action): dataModel.CardsList {
  switch (action.type) {
    case data.ActionTypes.ADD:
      return merge({}, state, {cards: [...state.cards, action.payload]});
    default:
      return state;
  }
}

export const getCards = (state: dataModel.CardsList) => state.cards;
