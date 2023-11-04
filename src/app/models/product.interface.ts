export interface Product {
  id: string;
  data: ProductData
}

export interface ProductData {
  price: number;
  description: string;
  title: string;
  category: string;
  employee: string;
  newReview: string;
  reviews: string[];
}
