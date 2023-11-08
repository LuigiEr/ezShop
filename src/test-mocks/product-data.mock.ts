import { IProductData } from "src/app/models/product.interface";

export const MockProductDataList: IProductData[] = [
  {
    title: 'testTitle1',
    category: 'testCategory1',
    price: 3,
    employee: 'testEmployee1',
    description: ' test desc 1',
    reviews: ['good', 'not bad']
  },
  {
    title: 'testTitle2',
    category: 'testCategory2',
    price: 15,
    employee: 'testEmployee2',
    description: ' test desc 2',
    reviews: []
  },
  {
    title: 'testTitle3',
    category: 'testCategory2',
    price: 0,
    employee: null,
    description: null,
    reviews: []
  }
]
