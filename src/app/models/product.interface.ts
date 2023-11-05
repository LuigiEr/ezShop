export interface IProduct {
  id: string;
  data: IProductData
}

export interface IProductData {
  title: string;
  category: string;
  price: number;
  employee?: string | null;
  description?: string | null;
  reviews?: string[] | null;
}
