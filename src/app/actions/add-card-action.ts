import {Action} from '@ngrx/store';
import {type} from 'utils/util';
import {ICard} from '../models/ICard';

export const ActionTypes = {
  ADD: type('[CardsList] Add Card'),
};

export class AddCardAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: ICard) {
  }
}

export type Actions = AddCardAction;
