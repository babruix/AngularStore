export interface IProduct {
  title: string;
  price: string;
  description: string;
  inCart?: boolean;
  quantity?: boolean;
  removed?: boolean;
}
