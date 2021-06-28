interface IPropsObj {
  id: number;
  Images: [];
  name: string;
  description: string;
  price: number;
  productId: string;
}

export interface IProductsType {
  products: IPropsObj[];
  pages: string;
  items: number;
  pag: number;
  tag: string;
  order: string;
  seller: string;
}

export interface IAcList {
  products: IPropsObj[];
  pages: string;
}