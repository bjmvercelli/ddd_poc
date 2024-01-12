export interface InputListProductDTO {}

type TProduct = {
  id: string;
  name: string;
  price: number;
}

export interface OutputListProductDTO {
  products: TProduct[];
}