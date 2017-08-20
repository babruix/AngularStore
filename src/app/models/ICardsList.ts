import {ICard} from './ICard';

export interface CardsList {
  cards: Array<ICard>;
}

export const defaults: CardsList = {
  cards: []
};
