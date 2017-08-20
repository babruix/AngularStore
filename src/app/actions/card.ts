import { Action } from '@ngrx/store';
import { type } from 'utils/util';
import { ICard } from '../models/ICard';

export const ActionTypes = {
  ADD: type('[CardsList] Add Card'),
  REMOVE: type('[CardsList] Remove Card'),
  TOGGLE_PINNED: type('[CardsList] Toggle Pinned'),
};

export class AddCardAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: string) {
  }
}

export class RemoveAction implements Action {
  type = ActionTypes.REMOVE;

  constructor(public payload: ICard) {
  }
}

export class TogglePinnedAction implements Action {
  type = ActionTypes.TOGGLE_PINNED;

  constructor(public payload: ICard) {
  }
}

export type Actions = AddCardAction | RemoveAction | TogglePinnedAction;
