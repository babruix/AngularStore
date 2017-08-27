import { Action } from '@ngrx/store';
import { type } from '../../utils/util';

export const ActionTypes = {
  SET_TOOLBAR_COLOR: type('[UI] COLOR'),
};

export class SetToolbarColorAction implements Action {
  type = ActionTypes.SET_TOOLBAR_COLOR;

  constructor(public payload: string) {
  }
}

export type Actions
  = SetToolbarColorAction;
