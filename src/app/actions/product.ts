import { Action } from '@ngrx/store';
import { type } from 'utils/util';
import { IProduct } from '../models/IProduct';

export const ActionTypes = {
  ADD: type('[ProductsList] Add Product'),
  REMOVE: type('[ProductsList] Remove Product'),
  TOGGLE_CART: type('[ProductsList] Add / Remove from Cart'),
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

export class ToggleCartAction implements Action {
  type = ActionTypes.TOGGLE_CART;

  constructor(public payload: IProduct) {
  }
}

export type Actions = AddProductAction | RemoveAction | ToggleCartAction;
