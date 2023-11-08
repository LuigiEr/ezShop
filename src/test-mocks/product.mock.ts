import { IProduct } from "src/app/models/product.interface";
import { MockProductDataList } from "./product-data.mock";

export const MockProductList: IProduct[] = [
  {
    id: 'test_id_1111',
    data: MockProductDataList[0]
  },
  {
    id: 'test_id_2222',
    data: MockProductDataList[1]
  },
  {
    id: 'test_id_3333',
    data: MockProductDataList[1]
  }
]
