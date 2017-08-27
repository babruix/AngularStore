import { IProduct } from './IProduct';

export interface ProductsList {
  products: Array<IProduct>;
}

export const defaults: ProductsList = {
  products: []
};
