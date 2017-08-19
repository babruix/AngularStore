import {Action} from '@ngrx/store';
import {type} from 'utils/util';
import {ICard} from '../models/ICard';

export const ActionTypes = {
  ADD: type('[CardsList] Add Card'),
  REMOVE: type('[CardsList] Remove Card')
};

export class AddCardAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: ICard) {
  }
}

export class RemoveAction implements Action {
  type = ActionTypes.REMOVE;

  constructor(public payload: ICard) {
  }
}

export type Actions = AddCardAction | RemoveAction;
