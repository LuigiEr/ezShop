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
  },
  {
    title: 'TitleVeryVeryLooooooooooooooooooooooong',
    category: 'CategoryVeryVeryLooooooooooooooooooooooong',
    price: -1,
    employee: 'EmployeeVeryVeryLooooooooooooooooooooooong',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.ggggggt',
    reviews: ['good', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.gggggggt']
  },
]
