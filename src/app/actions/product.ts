import { Action } from '@ngrx/store';
import { type } from 'utils/util';
import { IProduct } from '../models/IProduct';

export const ActionTypes = {
  ADD: type('[ProductsList] Add Product'),
  REMOVE: type('[ProductsList] Remove Product'),
  TOGGLE_PINNED: type('[ProductsList] Toggle Pinned'),
};

export class AddProductAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: string) {
  }
}

export class RemoveAction implements Action {
  type = ActionTypes.REMOVE;

  constructor(public payload: IProduct) {
  }
}

export class TogglePinnedAction implements Action {
  type = ActionTypes.TOGGLE_PINNED;

  constructor(public payload: IProduct) {
  }
}

export type Actions = AddProductAction | RemoveAction | TogglePinnedAction;
